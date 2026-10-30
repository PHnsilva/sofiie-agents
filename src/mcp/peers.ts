import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';
import { readFile } from 'node:fs/promises';
import { isAbsolute } from 'node:path';
import { z } from 'zod';

export const peerSchema = z.strictObject({
  id: z.string().regex(/^[a-z0-9-]{1,40}$/),
  command: z.string().refine(isAbsolute, 'O executável deve ter caminho absoluto.'),
  args: z.array(z.string().max(1000)).max(20),
  cwd: z.string().refine(isAbsolute, 'O diretório deve ter caminho absoluto.'),
  allowTools: z
    .array(z.string().regex(/^[a-zA-Z0-9_-]{1,80}$/))
    .min(1)
    .max(20),
});
const configSchema = z.strictObject({ peers: z.array(peerSchema).max(10) });
export type Peer = z.infer<typeof peerSchema>;

export async function loadPeer(id: string): Promise<Peer> {
  const content = await readFile(new URL('../../config/peers.local.json', import.meta.url), 'utf8');
  if (Buffer.byteLength(content) > 32000) throw new Error('Configuração de peers excede o limite.');
  const config = configSchema.parse(JSON.parse(content));
  if (new Set(config.peers.map((peer) => peer.id)).size !== config.peers.length)
    throw new Error('IDs de peers duplicados.');
  const peer = config.peers.find((item) => item.id === id);
  if (!peer) throw new Error('Peer não autorizado na configuração local.');
  return peer;
}

export async function callPeerTool(peerInput: Peer, tool: string, args: Record<string, unknown>) {
  const peer = peerSchema.parse(peerInput);
  if (!peer.allowTools.includes(tool)) throw new Error('Ferramenta fora da allowlist do peer.');
  if (Buffer.byteLength(JSON.stringify(args)) > 16000)
    throw new Error('Argumentos excedem o limite.');
  // O arquivo local é configuração confiável. Executar um peer não o isola do sistema.
  const env: Record<string, string> = { SOFIIE_PROVIDER: 'handoff' };
  for (const name of ['PATH', 'Path', 'SystemRoot', 'WINDIR', 'TEMP', 'TMP']) {
    if (process.env[name]) env[name] = process.env[name];
  }
  const transport = new StdioClientTransport({
    command: peer.command,
    args: peer.args,
    cwd: peer.cwd,
    env,
    stderr: 'ignore',
    maxBufferSize: 128000,
  });
  const client = new Client({ name: 'sofiie-peer-client', version: '0.1.0' });
  try {
    await client.connect(transport, { timeout: 10000 });
    const result = await client.callTool({ name: tool, arguments: args }, { timeout: 15000 });
    if (Buffer.byteLength(JSON.stringify(result)) > 64000)
      throw new Error('Resultado excede o limite.');
    return { peer: peer.id, trusted: false, result };
  } finally {
    await client.close();
    await transport.close();
  }
}
