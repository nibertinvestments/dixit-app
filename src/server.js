const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World from EKS CI/CD Demo!!');
});

app.get('/sleep', (req, res) => {
  const ms = parseInt(req.query.ms) || 1000;
  setTimeout(() => res.send(`Slept ${ms}ms`), ms);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
