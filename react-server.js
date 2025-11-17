const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Serve the React demo HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-demo.html'));
});

// Serve other HTML files
app.get('/internships', (req, res) => {
  res.sendFile(path.join(__dirname, 'find-internships.html'));
});

app.get('/community', (req, res) => {
  res.sendFile(path.join(__dirname, 'community.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'user-profile.html'));
});

app.listen(PORT, () => {
  console.log(`React demo server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});