const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/home-router');
const tableRouter = require('./routes/table-router');
const apiRouter = require('./routes/api-router');
const response = require('./accessories/response');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', homeRouter);
app.use('/datatable', tableRouter);
app.use('/v1', apiRouter);

app.use('*', function (req, res) {
    res.status(404).json(response.error("NOT FOUND", res.statusCode));
});

app.listen(3000);