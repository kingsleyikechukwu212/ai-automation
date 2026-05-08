const express = require('express');
const fetch = require('node-fetch');
const app = express();
const KEY = process.env.GOOGLE_API_KEY;

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  next();
});

app.get('/textsearch', async (req,res) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${new URLSearchParams({...req.query,key:KEY})}`;
  res.json(await fetch(url).then(r=>r.json()));
});

app.get('/details', async (req,res) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?${new URLSearchParams({...req.query,key:KEY})}`;
  res.json(await fetch(url).then(r=>r.json()));
});

app.listen(process.env.PORT || 3000);
