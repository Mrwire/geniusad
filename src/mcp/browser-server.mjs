#!/usr/bin/env node
import { createServer } from '@modelcontextprotocol/sdk/server/index.js';
import { tool } from '@modelcontextprotocol/sdk/types.js';
import * as rpc from '@modelcontextprotocol/sdk/types.js';
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

const server = createServer({ name: 'mcp-browser', version: '0.1.0' });

server.tool(
  tool({
    name: 'open_session',
    description: 'Create or reuse a browser session',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string', description: 'Arbitrary session id' },
        headless: { type: 'boolean' },
        locale: { type: 'string' },
        userAgent: { type: 'string' },
      },
      required: ['sessionId'],
      additionalProperties: false,
    },
    outputSchema: {
      type: 'object',
      properties: { sessionId: { type: 'string' } },
      required: ['sessionId'],
    },
  }),
  async ({ input }) => {
    await ensureSession(input.sessionId, input);
    return { sessionId: input.sessionId };
  }
);

server.tool(
  tool({
    name: 'close_session',
    description: 'Close a browser session',
    inputSchema: {
      type: 'object',
      properties: { sessionId: { type: 'string' } },
      required: ['sessionId'],
    },
    outputSchema: { type: 'object', properties: { closed: { type: 'boolean' } }, required: ['closed'] },
  }),
  async ({ input }) => ({ closed: await closeSession(input.sessionId) })
);

server.tool(
  tool({
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
    outputSchema: { type: 'object', properties: { url: { type: 'string' } }, required: ['url'] },
  }),
  async ({ input }) => {
    const { page } = await ensureSession(input.sessionId);
    await page.goto(input.url, { waitUntil: input.waitUntil || 'load', timeout: input.timeoutMs || 30000 });
    return { url: page.url() };
  }
);

server.tool(
  tool({
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
    outputSchema: { type: 'object', properties: { ok: { type: 'boolean' } }, required: ['ok'] },
  }),
  async ({ input }) => {
    const { page } = await ensureSession(input.sessionId);
    if (typeof input.nth === 'number') {
      const el = page.locator(input.selector).nth(input.nth);
      await el.click({ timeout: input.timeoutMs || 15000 });
    } else {
      await page.click(input.selector, { timeout: input.timeoutMs || 15000 });
    }
    return { ok: true };
  }
);

server.tool(
  tool({
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
    outputSchema: { type: 'object', properties: { ok: { type: 'boolean' } }, required: ['ok'] },
  }),
  async ({ input }) => {
    const { page } = await ensureSession(input.sessionId);
    await page.fill(input.selector, input.text, { timeout: input.timeoutMs || 15000 });
    return { ok: true };
  }
);

server.tool(
  tool({
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
    outputSchema: { type: 'object', properties: { ok: { type: 'boolean' } }, required: ['ok'] },
  }),
  async ({ input }) => {
    const { page } = await ensureSession(input.sessionId);
    await page.waitForSelector(input.selector, { state: input.state || 'visible', timeout: input.timeoutMs || 15000 });
    return { ok: true };
  }
);

server.tool(
  tool({
    name: 'evaluate',
    description: 'Evaluate JS in the page context',
    inputSchema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string' },
        expression: { type: 'string', description: 'A serializable JS expression to eval' },
      },
      required: ['sessionId', 'expression'],
    },
    outputSchema: { type: 'object', properties: { value: {} }, required: ['value'] },
  }),
  async ({ input }) => {
    const { page } = await ensureSession(input.sessionId);
    const value = await page.evaluate((expr) => {
      // eslint-disable-next-line no-new-func
      return Function(`return (${expr})`)();
    }, input.expression);
    return { value };
  }
);

server.tool(
  tool({
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
    outputSchema: { type: 'object', properties: { base64: { type: 'string' } }, required: ['base64'] },
  }),
  async ({ input }) => {
    const { page } = await ensureSession(input.sessionId);
    let buffer;
    if (input.selector) {
      const el = page.locator(input.selector).first();
      buffer = await el.screenshot({ type: input.type || 'png', quality: input.quality });
    } else {
      buffer = await page.screenshot({ fullPage: input.fullPage !== false, type: input.type || 'png', quality: input.quality });
    }
    return { base64: Buffer.from(buffer).toString('base64') };
  }
);

server.tool(
  tool({
    name: 'content',
    description: 'Get current page content (HTML)',
    inputSchema: { type: 'object', properties: { sessionId: { type: 'string' } }, required: ['sessionId'] },
    outputSchema: { type: 'object', properties: { html: { type: 'string' } }, required: ['html'] },
  }),
  async ({ input }) => {
    const { page } = await ensureSession(input.sessionId);
    return { html: await page.content() };
  }
);

server.onerror = (err) => {
  console.error('MCP Browser server error:', err);
};

server.start();

