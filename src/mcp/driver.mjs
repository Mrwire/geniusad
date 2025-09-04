#!/usr/bin/env node
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function run() {
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['src/mcp/browser-server.mjs'],
  });

  const client = new Client({ name: 'mcp-driver', version: '0.1.0' }, transport);
  await client.connect();

  const sessionId = 'cf';
  const step = process.argv[2] || 'login';

  // helper to call a tool and parse JSON text responses
  async function call(name, args) {
    const res = await client.callTool({ name, arguments: args });
    const item = res?.content?.[0];
    if (!item) return null;
    if (item.type === 'text') {
      try { return JSON.parse(item.text); } catch { return item.text; }
    }
    return item;
  }

  if (step === 'login') {
    await call('open_session', { sessionId, headless: false });
    await call('goto', { sessionId, url: 'https://dash.cloudflare.com/login', waitUntil: 'load' });
    await call('waitForSelector', { sessionId, selector: 'input[type=email]', state: 'visible' });

    const rl = readline.createInterface({ input, output });
    await rl.question('\nVeuillez vous connecter (email / mot de passe / 2FA) dans la fenêtre ouverte.\nAppuyez Entrée quand c\'est fait pour continuer...');
    rl.close();

    // Aller à Pages listing
    await call('goto', { sessionId, url: 'https://dash.cloudflare.com/?to=/:account/pages', waitUntil: 'load' });
    console.log('Ouverture de Cloudflare Pages réussie.');
    process.exit(0);
  }

  if (step === 'pages') {
    await call('open_session', { sessionId, headless: false });
    await call('goto', { sessionId, url: 'https://dash.cloudflare.com/?to=/:account/pages', waitUntil: 'load' });
    await call('waitForSelector', { sessionId, selector: 'text=Create project', state: 'visible' }).catch(() => {});
    console.log('Page Pages ouverte. Si nécessaire, cliquez manuellement sur "Create project".');
    process.exit(0);
  }

  console.log('Etape inconnue. Utilisez: node src/mcp/driver.mjs login | pages');
  process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

