const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Test Server</h1><p>If you can see this, your network connection is working.</p>');
});

const PORT = process.env.PORT || 3090;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running at http://localhost:${PORT}/`);
  console.log(`Also try accessing: http://127.0.0.1:${PORT}/`);
}); 