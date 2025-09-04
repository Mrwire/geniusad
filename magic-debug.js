const { spawn } = require('child_process');
const fs = require('fs');

// Configuration
const API_KEY = '51b307d0e68cad9668c6b30d92aa280e7ba61db9e57be6d6561a7826a1aecaa3';
const LOG_FILE = './magic-debug.log';

// Clear previous log
fs.writeFileSync(LOG_FILE, '');

// Log function
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  console.log(message);
  fs.appendFileSync(LOG_FILE, logMessage);
}

// Start the MCP server with debug info
log('Starting @21st-dev/magic server with debug information...');
log(`Using API_KEY: ${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}`);

// Environment variables
const env = {
  ...process.env,
  MAGIC_API_KEY: API_KEY,
  API_KEY: API_KEY,
  DEBUG: '*',
  NODE_DEBUG: 'net,http,stream',
  NODE_OPTIONS: '--trace-warnings'
};

// Start the server process
const magicProcess = spawn('npx', ['-y', '@21st-dev/magic@latest'], {
  env,
  shell: true,
  stdio: 'pipe'
});

// Handle process events
magicProcess.stdout.on('data', (data) => {
  log(`STDOUT: ${data.toString().trim()}`);
});

magicProcess.stderr.on('data', (data) => {
  log(`STDERR: ${data.toString().trim()}`);
});

magicProcess.on('error', (error) => {
  log(`ERROR: ${error.message}`);
});

magicProcess.on('close', (code) => {
  log(`Process exited with code ${code}`);
});

log('Debug script running. Check magic-debug.log for detailed output.');
