const express = require('express');
const path = require('path');

const homeRouter = require('./routes/home-router');
const tableRouter = require('./routes/table-router');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/datatable', tableRouter);

app.listen(3000);