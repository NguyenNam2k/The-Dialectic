const { spawn } = require('child_process');
const path = require('path');

console.log('--- KHỞI CHẠY HỆ THỐNG PHÒNG THÍ NGHIỆM CNXHKH ---');

const server = spawn('cmd.exe', ['/c', 'node index.js'], {
  cwd: path.join(__dirname, 'Server'),
  stdio: 'pipe'
});

server.stdout.on('data', (data) => {
  console.log(`[Server] ${data.toString().trim()}`);
});

server.stderr.on('data', (data) => {
  console.error(`[Server Err] ${data.toString().trim()}`);
});

const client = spawn('cmd.exe', ['/c', 'npm run dev'], {
  cwd: path.join(__dirname, 'Client'),
  stdio: 'pipe'
});

client.stdout.on('data', (data) => {
  console.log(`[Client] ${data.toString().trim()}`);
});

client.stderr.on('data', (data) => {
  console.error(`[Client Err] ${data.toString().trim()}`);
});

process.on('SIGINT', () => {
  server.kill();
  client.kill();
  process.exit();
});
