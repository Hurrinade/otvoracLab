const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const db = require('../db/query');
const router = express.Router();
const response = require('../accessories/response');


// create application/json parser


router.get('/', function (req, res) {
    res.sendFile(path.resolve('views/index.html'));
});


module.exports = router;