const http = require('http');
const express = require('express');
const cors = require('cors');
require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const {errorHandler} = require('./handlerError/handler');
const { writeToFile } = require('./handlerError/logErrors');
var cron = require('node-cron');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(errorHandler);

const server = http.createServer(app);
server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`));
controller.createConnection(server);


// cron.schedule('0 12 1-31 * *', () => {
//   writeToFile();
// });

// cron.schedule('*/15 * * * *', () => {
//   writeToFile();
// });