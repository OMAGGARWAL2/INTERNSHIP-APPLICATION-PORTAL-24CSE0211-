const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types for content
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.jsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

// Simple file server
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Handle routing
  let filePath = req.url;
  
  // Default route
  if (filePath === '/' || filePath === '/index.html') {
    filePath = '/react-demo.html';
  }
  
  // Add .html extension if no extension provided
  if (!path.extname(filePath)) {
    filePath += '.html';
  }
  
  // Security check - prevent directory traversal
  if (filePath.includes('..')) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  // Resolve file path
  filePath = path.join(__dirname, filePath);
  
  // Get file extension
  const extname = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Special handling for favicon
  if (filePath.endsWith('favicon.ico')) {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end('', 'utf-8');
    return;
  }
  
  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // For JS files that are not found, return empty content
        if (extname === '.js' || extname === '.jsx') {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end('', 'utf-8');
          return;
        }
        
        // For HTML files, serve react-demo.html as fallback
        fs.readFile(path.join(__dirname, 'react-demo.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`React demo server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});