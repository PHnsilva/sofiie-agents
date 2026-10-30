import { specialists } from './agents/catalog.js';
import { planTask } from './orchestrator/planner.js';
import { consultSpecialist } from './providers/model.js';
import { callPeerTool, loadPeer } from './mcp/peers.js';

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (command === 'agents') return specialists;
  if (command === 'plan') return planTask({ objective: args.join(' ') });
  if (command === 'consult') return consultSpecialist(args[0] ?? '', args.slice(1).join(' '));
  if (command === 'peer') {
    const [id, tool, json = '{}'] = args;
    if (!id || !tool) throw new Error('Uso: npm run peer -- <peer-id> <tool> [JSON]');
    const input: unknown = JSON.parse(json);
    if (!input || typeof input !== 'object' || Array.isArray(input))
      throw new Error('Argumentos devem ser objeto JSON.');
    return callPeerTool(await loadPeer(id), tool, input as Record<string, unknown>);
  }
  throw new Error('Use agents, plan, consult ou peer. Consulte README.md.');
}

main()
  .then((result) => console.log(JSON.stringify(result, null, 2)))
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : 'Falha de execução.');
    process.exitCode = 1;
  });
