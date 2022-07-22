const bodyParser = require('body-parser');
const express = require('express');
const open = require('open');

const DEFAULT_PORT = 3510;
const cachedServer = {};

const createServer = (port = DEFAULT_PORT, needOpen = false) => {
  const url = `http://127.0.0.1:${port}`;
  if (cachedServer[port]) {
    openBrowserIfNeeded(url, needOpen);
    return cachedServer[port];
  }
  const app = express();
  cachedServer[port] = app;

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  app.listen(port, () => {
    console.log(`server starts at ${url}`);
    console.log(`debug=http://127.0.0.1:3510/api/file`);
    // open(url);
  });
  return app;
};

const app = createServer(DEFAULT_PORT);
const fs = require('fs');
app.get('/api/file', async (req, res) => {
  const content = fs.readFileSync('./src/index.js', 'utf8');
  res.status(200).json({ content: content }).end();
});
