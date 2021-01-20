const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('express-async-errors');
const di = require('./di');
const config = require('./config');
const errorHandler = require('./plugins/errorHandler');

const app = express();

app.use(helmet());
app.use(
    cors({
        origin(origin, callback) {
            callback(null, true);
        },
        credentials: true
    })
);
app.use(bodyParser.json());

require('./plugins/dayjs')();

const router = require('./routes')(di);

app.use('/', express.static(path.join(__dirname, '../../client-dist')));

app.use('/api', router);

app.use(errorHandler);

const { port } = config.server;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
