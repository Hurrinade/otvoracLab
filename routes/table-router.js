const express = require('express');
const db = require('../db/query');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.resolve('views/datatable.html'));
});

router.get('/data', async function (req, res) {
    const rawData = (await db.query('select * from mytable join metrics on mytable.date = metrics.date')).rows;
    res.send(rawData);
});

module.exports = router;