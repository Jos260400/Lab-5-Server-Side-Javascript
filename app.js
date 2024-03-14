const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 18071; 

app.use(express.json());

app.use((req, res, next) => {
  const originalSend = res.send.bind(res);
  const { method, url } = req;
  const requestBody = JSON.stringify(req.body);

  res.send = (body) => {
    const logEntry = `Time: ${new Date().toISOString()}, Method: ${method}, URL: ${url}, Request Body: ${requestBody}, Response Body: ${body}\n`;
    fs.appendFile(path.join(__dirname, 'log.txt'), logEntry, (err) => {
      if (err) console.error('Error leyendo el archivo', err);
    });
    originalSend(body);
  };
  
  next();
});

app.get('/', (req, res) => {
  res.send('Hola');
});

app.use((req, res, next) => {
  res.status(404).send("No lo puedo encontrar");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo roto.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
