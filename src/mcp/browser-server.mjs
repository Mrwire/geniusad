#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { chromium } from 'playwright';

const sessions = new Map();

async function ensureSession(sessionId, options = {}) {
  if (sessions.has(sessionId)) return sessions.get(sessionId);
  const browser = await chromium.launch({ headless: options.headless !== false });
  const context = await browser.newContext({
    locale: options.locale || 'en-US',
    userAgent: options.userAgent,
  });
  const page = await context.newPage();
  const session = { browser, context, page };
  sessions.set(sessionId, session);
  return session;
}

async function closeSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  await session.context.close().catch(() => {});
  await session.browser.close().catch(() => {});
  sessions.delete(sessionId);
  return true;
}

const server = new Server(
  { name: 'mcp-browser', version: '0.1.0' },
  { capabilities: { tools: {} } },
  new StdioServerTransport()
);

const tools = [
  {
    name: 'open_session',
    description: 'Create or reuse a browser session',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string' },
        headless: { type: 'boolean' },
        locale: { type: 'string' },
        userAgent: { type: 'string' },
      },
      required: ['sessionId'],
      additionalProperties: false,
    },
  },
  {
    name: 'close_session',
    description: 'Close a browser session',
    inputSchema: { type: 'object', properties: { sessionId: { type: 'string' } }, required: ['sessionId'] },
  },
  {
    name: 'goto',
    description: 'Navigate to URL in session',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string' },
        url: { type: 'string' },
        waitUntil: { type: 'string', enum: ['load', 'domcontentloaded', 'networkidle'] },
        timeoutMs: { type: 'number' },
      },
      required: ['sessionId', 'url'],
    },
  },
  {
    name: 'click',
    description: 'Click an element',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string' },
        selector: { type: 'string' },
        timeoutMs: { type: 'number' },
        nth: { type: 'number' },
      },
      required: ['sessionId', 'selector'],
    },
  },
  {
    name: 'fill',
    description: 'Type text into an input',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string' },
        selector: { type: 'string' },
        text: { type: 'string' },
        timeoutMs: { type: 'number' },
      },
      required: ['sessionId', 'selector', 'text'],
    },
  },
  {
    name: 'waitForSelector',
    description: 'Wait for selector state',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string' },
        selector: { type: 'string' },
        state: { type: 'string', enum: ['attached', 'detached', 'visible', 'hidden'] },
        timeoutMs: { type: 'number' },
      },
      required: ['sessionId', 'selector'],
    },
  },
  {
    name: 'evaluate',
    description: 'Evaluate JS in the page context',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string' },
        expression: { type: 'string' },
      },
      required: ['sessionId', 'expression'],
    },
  },
  {
    name: 'screenshot',
    description: 'Capture a screenshot',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string' },
        fullPage: { type: 'boolean' },
        selector: { type: 'string' },
        type: { type: 'string', enum: ['png', 'jpeg'] },
        quality: { type: 'number' },
      },
      required: ['sessionId'],
    },
  },
  {
    name: 'content',
    description: 'Get current page content (HTML)',
    inputSchema: { type: 'object', properties: { sessionId: { type: 'string' } }, required: ['sessionId'] },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;
  try {
    switch (name) {
      case 'open_session': {
        await ensureSession(args.sessionId, args);
        return { content: [{ type: 'text', text: JSON.stringify({ sessionId: args.sessionId }) }] };
      }
      case 'close_session': {
        const closed = await closeSession(args.sessionId);
        return { content: [{ type: 'text', text: JSON.stringify({ closed }) }] };
      }
      case 'goto': {
        const { page } = await ensureSession(args.sessionId);
        await page.goto(args.url, { waitUntil: args.waitUntil || 'load', timeout: args.timeoutMs || 30000 });
        return { content: [{ type: 'text', text: JSON.stringify({ url: page.url() }) }] };
      }
      case 'click': {
        const { page } = await ensureSession(args.sessionId);
        if (typeof args.nth === 'number') {
          await page.locator(args.selector).nth(args.nth).click({ timeout: args.timeoutMs || 15000 });
        } else {
          await page.click(args.selector, { timeout: args.timeoutMs || 15000 });
        }
        return { content: [{ type: 'text', text: JSON.stringify({ ok: true }) }] };
      }
      case 'fill': {
        const { page } = await ensureSession(args.sessionId);
        await page.fill(args.selector, args.text, { timeout: args.timeoutMs || 15000 });
        return { content: [{ type: 'text', text: JSON.stringify({ ok: true }) }] };
      }
      case 'waitForSelector': {
        const { page } = await ensureSession(args.sessionId);
        await page.waitForSelector(args.selector, { state: args.state || 'visible', timeout: args.timeoutMs || 15000 });
        return { content: [{ type: 'text', text: JSON.stringify({ ok: true }) }] };
      }
      case 'evaluate': {
        const { page } = await ensureSession(args.sessionId);
        const value = await page.evaluate((expr) => Function(`return (${expr})`)(), args.expression);
        return { content: [{ type: 'text', text: JSON.stringify({ value }) }] };
      }
      case 'screenshot': {
        const { page } = await ensureSession(args.sessionId);
        let buffer;
        if (args.selector) {
          buffer = await page.locator(args.selector).first().screenshot({ type: args.type || 'png', quality: args.quality });
        } else {
          buffer = await page.screenshot({ fullPage: args.fullPage !== false, type: args.type || 'png', quality: args.quality });
        }
        return { content: [{ type: 'image', data: Buffer.from(buffer).toString('base64'), mimeType: args.type === 'jpeg' ? 'image/jpeg' : 'image/png' }] };
      }
      case 'content': {
        const { page } = await ensureSession(args.sessionId);
        const html = await page.content();
        return { content: [{ type: 'text', text: html }] };
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err) {
    return { content: [{ type: 'text', text: JSON.stringify({ error: String(err.message || err) }) }] };
  }
});

server.onerror = (err) => {
  console.error('MCP Browser server error:', err);
};

server.connect();
