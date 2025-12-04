const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res //Only sent when we have a get method
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' }); //automatically sets content-type as application/json...
});

app.post('/', (req, res) => {
  res.send('You can post to this input');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
