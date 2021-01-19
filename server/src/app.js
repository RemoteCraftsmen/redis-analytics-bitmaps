const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const di = require('./di');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

require('./plugins/dayjs')();

const router = require('./routes')(di);

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use('/api', router);

module.exports = app;
