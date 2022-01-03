const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const db = require('../db/query');
const router = express.Router();
const response = require('../accessories/response');


// create application/json parser


router.get('/', function (req, res) {
    if (req.oidc.isAuthenticated()) {
        res.sendFile(path.resolve('views/index.html'));
    } else {
        res.send('You are not authenticated');
    }
});

router.put('/updateData', async function (req, res) {

    try {
        await db.query('copy(SELECT json_agg(row_to_json(t)) FROM(select city, country, creator, keywords, date, time, dateandtimeformat, language, timezone, (select json_agg(row_to_json(metrics))from metrics where date = mytable.date) as metrics from mytable) t ) to \'c://Users/Hurrinade/Desktop/otvoracLab/public/dataFormats/jsonData.json\';');
        await db.query('copy(select city, country, creator, keywords, date, time, dateandtimeformat, language, timezone, (select metrics from metrics where date = mytable.date) as metrics from mytable ) to \'c://Users/Hurrinade/Desktop/otvoracLab/public/dataFormats/csvData.csv\' delimiter \',\' csv;');
        res.json({ success: true });
    } catch (e) {
        res.json({ success: false });
    }

});

// kod za generiranje JSON-a iz nasih tablica
// copy
//     (SELECT json_agg(row_to_json(t))
// FROM(
//         select city, country, creator, keywords, date, time, dateandtimeformat, language, timezone, (
//         select json_agg(row_to_json(metrics))
// 		from metrics
// 		where date = mytable.date
//     ) as metrics
// 	from mytable
//     ) t ) to 'c://Users/Marko/Desktop/jsonData.txt';

// kod za generiranje CSV-a iz nasih tablica
// copy(select city, country, creator, keywords, date, time, dateandtimeformat, language, timezone,
//     (
//         select metrics
// 		from metrics
// 		where date = mytable.date
// ) as metrics
// 	from mytable
//     ) to 'c://Users/Marko/Desktop/csvData.txt' delimiter ',' csv;


module.exports = router;