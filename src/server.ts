import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';


const NAMESPACE = 'server';
const router = express();

/* Logging the request */
router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  })

  next();
});


/* Body Parser */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* Rules of our API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/* Routes */
router.use('/sample', sampleRoutes);

/* Error handling */
router.use((req, res, next) => {
  const error = new Error('Not found');

  return res.status(404).json({
    message: error.message
  });
});


/* Server */
const server = http.createServer(router);
server.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running on port ${config.server.port}`));
