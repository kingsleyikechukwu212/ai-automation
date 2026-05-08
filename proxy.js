const express = require('express');
const https = require('https');
const app = express();

const KEY = process.env.GOOGLE_API_KEY;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

function googleFetch(url, res) {
  https.get(url, (r) => {
    let data = '';
    r.on('data', chunk => data += chunk);
    r.on('end', () => {
      try { res.json(JSON.parse(data)); }
      catch(e) { res.status(500).json({ error: 'Parse error' }); }
    });
  }).on('error', (e) => res.status(500).json({ error: e.message }));
}

app.get('/textsearch', (req, res) => {
  const params = new URLSearchParams({ ...req.query, key: KEY });
  googleFetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`, res);
});

app.get('/details', (req, res) => {
  const params = new URLSearchParams({ ...req.query, key: KEY });
  googleFetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, res);
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(process.env.PORT || 3000, () => console.log('Proxy running'));
