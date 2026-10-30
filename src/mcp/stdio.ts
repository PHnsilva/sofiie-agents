import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { createServer } from './server.js';

serveStdio(createServer, {
  onerror: () => {
    console.error('Falha na comunicação MCP.');
  },
});
