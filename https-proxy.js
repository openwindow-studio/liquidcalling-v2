const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:3000',
  changeOrigin: true
});

const server = https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, (req, res) => {
  proxy.web(req, res);
});

server.listen(3443, '0.0.0.0', () => {
  console.log('HTTPS proxy running on https://0.0.0.0:3443');
  console.log('Access from your phone at https://192.168.1.101:3443');
});