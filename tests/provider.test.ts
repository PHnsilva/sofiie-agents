import { test } from 'node:test';
import assert from 'node:assert/strict';
import { consultSpecialist, validateLocalModel } from '../src/providers/model.js';

test('handoff padrão funciona sem rede e informa que não executou inferência', async () => {
  const result = await consultSpecialist('backend', 'Revisar contrato HTTP', {}, async () => {
    throw new Error('Não deve chamar rede');
  });
  assert.equal(result.status, 'handoff');
  assert.equal(result.inferenceExecuted, false);
});
test('provedor pago e modelos cloud/remotos são bloqueados', async () => {
  await assert.rejects(
    consultSpecialist('backend', 'Revisar contrato HTTP', { SOFIIE_PROVIDER: 'paid' }),
  );
  for (const model of [undefined, 'model:cloud', 'https://example.com', 'org/model', 'foo cloud'])
    assert.throws(() => validateLocalModel(model));
});
test('modelo ausente não dispara geração nem fallback remoto', async () => {
  let calls = 0;
  await assert.rejects(
    consultSpecialist(
      'qa',
      'Revisar critérios de testes',
      { SOFIIE_PROVIDER: 'ollama', SOFIIE_MODEL: 'local:small' },
      async () => {
        calls++;
        return Response.json({ models: [] });
      },
    ),
    /não encontrado localmente/,
  );
  assert.equal(calls, 1);
});
test('adaptador usa somente loopback, sem redirects, e marca resposta não confiável', async () => {
  const requests: string[] = [];
  const result = await consultSpecialist(
    'qa',
    'Revisar critérios de testes',
    { SOFIIE_PROVIDER: 'ollama', SOFIIE_MODEL: 'local:small' },
    async (url, options) => {
      requests.push(String(url));
      assert.equal(options?.redirect, 'error');
      return String(url).endsWith('/api/tags')
        ? Response.json({ models: [{ name: 'local:small' }] })
        : Response.json({ message: { content: 'Proposta de testes' }, done: true });
    },
  );
  assert.deepEqual(requests, [
    'http://127.0.0.1:11434/api/tags',
    'http://127.0.0.1:11434/api/chat',
  ]);
  assert.equal(result.status, 'generated');
  if (result.status === 'generated') assert.equal(result.trusted, false);
});
test('respostas incompletas e HTTP inválido falham explicitamente', async () => {
  const env = { SOFIIE_PROVIDER: 'ollama', SOFIIE_MODEL: 'local:small' };
  await assert.rejects(
    consultSpecialist(
      'qa',
      'Revisar critérios de testes',
      env,
      async () => new Response(null, { status: 503 }),
    ),
  );
  await assert.rejects(
    consultSpecialist('qa', 'Revisar critérios de testes', env, async (url) =>
      String(url).endsWith('/api/tags')
        ? Response.json({ models: [{ name: 'local:small' }] })
        : Response.json({ message: { content: 'Resposta parcial' }, done: false }),
    ),
  );
});
test('inferência simultânea é rejeitada e o limite é liberado após falha', async () => {
  const env = { SOFIIE_PROVIDER: 'ollama', SOFIIE_MODEL: 'local:small' };
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const running = consultSpecialist('qa', 'Revisar critérios de testes', env, async () => {
    await gate;
    return new Response(null, { status: 503 });
  });
  await assert.rejects(consultSpecialist('qa', 'Revisar critérios de testes', env), /em andamento/);
  release();
  await assert.rejects(running);
  assert.equal(
    (await consultSpecialist('qa', 'Revisar critérios de testes', {})).status,
    'handoff',
  );
  await assert.rejects(
    consultSpecialist(
      'qa',
      'Revisar critérios de testes',
      env,
      async () => new Response(null, { status: 503 }),
    ),
    /HTTP 503/,
  );
});
