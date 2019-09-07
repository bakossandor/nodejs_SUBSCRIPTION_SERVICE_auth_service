require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/router');

const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.status(200).end();
});

router(app);

app.use('/', (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.statusCode).send({'developerMessage': err.message})
})

const port = process.env.port || 8002;
app.listen(port, () => {
  console.log(`Auth service is listening on port ${port}`);
});
