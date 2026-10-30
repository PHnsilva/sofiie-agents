import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { specialists, getSpecialist, specialistInstructions } from '../agents/catalog.js';
import { planTask, taskSchema } from '../orchestrator/planner.js';
import { consultSpecialist } from '../providers/model.js';
import { searchKnowledge } from '../memory/search.js';

const readOnly = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};
const textResult = (data: unknown) => ({
  content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
});
const idSchema = z.enum(specialists.map((item) => item.id) as [string, ...string[]]);

export function createServer() {
  const server = new McpServer({ name: 'sofiie-agents', version: '0.1.0' });
  server.registerTool(
    'list_specialists',
    {
      description: 'Lista 24 perfis configuráveis. Não inicia agentes nem modelos.',
      inputSchema: z.strictObject({}),
      annotations: readOnly,
    },
    async () => textResult(specialists),
  );
  server.registerTool(
    'get_specialist',
    {
      description: 'Retorna missão, critérios e instruções de um especialista.',
      inputSchema: z.strictObject({ id: idSchema }),
      annotations: readOnly,
    },
    async ({ id }) =>
      textResult({ ...getSpecialist(id), instructions: specialistInstructions(id) }),
  );
  server.registerTool(
    'plan_task',
    {
      description:
        'Produz um plano por heurística ou seleção explícita. Não implementa nem executa tarefas.',
      inputSchema: taskSchema,
      annotations: readOnly,
    },
    async (input) => textResult(planTask(input)),
  );
  server.registerTool(
    'consult_specialist',
    {
      description:
        'Prepara um handoff gratuito ou consulta Ollama local quando habilitado pelo operador. Saída exige revisão.',
      inputSchema: z.strictObject({ id: idSchema, objective: z.string().trim().min(5).max(4000) }),
      annotations: { ...readOnly, idempotentHint: false },
    },
    async ({ id, objective }) => {
      try {
        return textResult(await consultSpecialist(id, objective));
      } catch {
        return {
          ...textResult({
            error:
              'Consulta indisponível. Verifique provedor, modelo local e serviço Ollama no computador do operador.',
          }),
          isError: true,
        };
      }
    },
  );
  server.registerTool(
    'search_knowledge',
    {
      description:
        'Busca lexical em referências versionadas e lições aprovadas. Não grava nem promove memória.',
      inputSchema: z.strictObject({ query: z.string().trim().min(2).max(200) }),
      annotations: readOnly,
    },
    async ({ query }) => textResult(await searchKnowledge(query)),
  );
  return server;
}
