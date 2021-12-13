const express = require('express');
const db = require('../db/query');
const path = require('path');
const router = express.Router();
const response = require('../accessories/response');

//GET specification
router.get('/specification', async function (req, res) {

    res.set('Content-Type', "application/json");

    res.sendFile(path.resolve('openapi.json'));
});

//GET all data
router.get('/all', async function (req, res) {

    res.set('Content-Type', "application/json");

    try {
        const rawData = (await db.query('select * from mytable join metrics on mytable.date = metrics.date')).rows;

        res.status(200).json(response.success(rawData, "OK", res.statusCode));
    } catch (e) {

        res.status(500).json(response.error(
            "Internal Server Error " + e, res.statusCode
        ));
    }
});

//GET data by ID
router.get('/all/:id(\\d+)', async function (req, res) {

    res.set('Content-Type', "application/json");

    try {
        var id = parseInt(req.params.id);
        console.log(id);

        var elementCount = (await db.query(`select count(*) from mytable`)).rows;
        elementCount = parseInt(elementCount[0].count);

        console.log(elementCount);

        if (id > elementCount || id < 1) {
            res.status(400).json(response.error("Bad Request", res.statusCode))
        } else {
            const rawData = (await db.query(`select * from mytable join metrics on mytable.date = metrics.date where id = $1`, [id])).rows;


            res.status(200).json(response.success(rawData, "OK", res.statusCode));
        }
    } catch (e) {

        res.status(500).json(response.error(
            "Internal Server Error " + e, res.statusCode
        ));
    }

});

//GET data randomly
router.get('/all/random', async function (req, res) {

    res.set('Content-Type', "application/json");

    try {

        var elementCount = (await db.query(`select count(*) from mytable`)).rows;
        elementCount = parseInt(elementCount[0].count);

        var id = Math.floor(Math.random() * (elementCount - 1 + 1) + 1);

        const rawData = (await db.query(`select * from mytable join metrics on mytable.date = metrics.date where id = $1`, [id])).rows;

        res.status(200).json(response.success(rawData, "OK", res.statusCode));

    } catch (e) {

        res.status(500).json(response.error(
            "Internal Server Error " + e, res.statusCode
        ));
    }

});

//GET all dates
router.get('/all/dates', async function (req, res) {

    res.set('Content-Type', "application/json");

    try {
        const dates = (await db.query(`select date from mytable`)).rows;

        res.status(200).json(response.success(dates, "OK", res.statusCode));
    } catch (e) {
        res.status(500).json(response.error(
            "Internal Server Error " + e, res.statusCode
        ));
    }


});

//GET average temperature from each date
router.get('/all/avg', async function (req, res) {

    res.set('Content-Type', "application/json");

    try {
        const rawData = (await db.query('select * from mytable join metrics on mytable.date = metrics.date')).rows;
        var avg = 0;

        var avgTemps = [];

        for (let d in rawData) {
            avg = (rawData[d].currtemp + rawData[d].hightemp + rawData[d].mintemp) / 3;
            avgTemps[d] = { averageTemp: avg };
        }

        res.status(200).json(response.success(avgTemps, "OK", res.statusCode));
    } catch (e) {

        res.status(500).json(response.error(
            "Internal Server Error " + e, res.statusCode
        ));
    }


});

//POST add new data
router.post('/add', async function (req, res) {

    res.set('Content-Type', "application/json");
    var regEx = /^\d{4}-\d{2}-\d{2}$/;

    if (isNaN(parseInt(req.body.mintemp)) || isNaN(parseInt(req.body.currtemp)) || isNaN(parseInt(req.body.hightemp)) || !(req.body.date).match(regEx)) {
        res.status(400).json(response.error("Bad Request, temperatures need to be numeric and date yyyy-mm-dd", res.statusCode));
    } else {
        try {
            const maxId = (await db.query(`select max(id) from metrics`)).rows;
            const dates = (await db.query(`select date from mytable`)).rows;

            var alreadyIn = false;

            for (let date of dates) {
                if (date.date === req.body.date) {
                    res.status(406).json(response.error("there can be only one messure per date (date already exists)", res.statusCode));
                    alreadyIn = true;
                }
            }

            if (!alreadyIn) {

                (await db.query(`insert into mytable values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, ["Zagreb", "Croatia", "Marko <marko.vura8@gmail.com>", "weather, temperature", req.body.date, "12:00:00:0000", "ISO 8601", "english", "CEST"]));
                (await db.query(`insert into metrics values ($1,$2,$3,$4,$5)`, [req.body.currtemp, req.body.hightemp, req.body.mintemp, req.body.date, maxId[0].max + 1]));

                var newDummy =
                {
                    city: "Zagreb",
                    country: "Croatia",
                    creator: "Marko <marko.vura8@gmail.com>",
                    keywords: "weather, temperature",
                    date: req.body.date,
                    time: "12:00:00:0000",
                    dateandtimeformat: "ISO 8601",
                    anguage: "english",
                    timezone: "CEST",
                    currtemp: req.body.currtemp,
                    hightemp: req.body.hightemp,
                    mintemp: req.body.mintemp,
                    id: maxId[0].max + 1
                }

                res.status(201).json(response.success({ info: "Successfully created", newResourceLink: `http://localhost:3000/v1/${maxId[0].max + 1}` }, "Created", res.statusCode));
            }
        } catch (e) {

            res.status(500).json(response.error(
                "Internal Server Error " + e, res.statusCode
            ));
        }
    }
});

//PUT update data
router.put('/update/:id(\\d+)', async function (req, res) {

    res.set('Content-Type', "application/json");
    if (isNaN(parseInt(req.body.mintemp))) {
        res.status(400).json(response.error("Bad Request, mintemp is not a number", res.statusCode));
    } else {
        try {
            var id = parseInt(req.params.id);
            console.log(id);

            var elementCount = (await db.query(`select count(*) from mytable`)).rows;
            elementCount = parseInt(elementCount[0].count);

            console.log(elementCount);

            if (id > elementCount || id < 1) {
                res.status(400).json(response.error("Bad Request", res.statusCode));
            } else {

                (await db.query(`update metrics set mintemp = $1 where id = $2;`, [req.body.mintemp, id]));

                res.status(200).json(response.success({ info: "Successfully updated" }, "OK", res.statusCode));
            }
        } catch (e) {

            res.status(500).json(response.error(
                "Internal Server Error " + e, res.statusCode
            ));
        }
    }
});

//DELETE delete data
router.delete('/delete/:id(\\d+)', async function (req, res) {

    res.set('Content-Type', "application/json");

    try {
        var id = parseInt(req.params.id);
        console.log(id);

        var elementCount = (await db.query(`select count(*) from mytable`)).rows;
        elementCount = parseInt(elementCount[0].count);

        console.log(elementCount);

        if (id > elementCount || id < 1) {
            res.status(400).json(response.error("Bad Request", res.statusCode));
        } else {

            var deleteDate = (await db.query(`select date from metrics where id = $1;`, [id])).rows;
            deleteDate = deleteDate[0].date;


            (await db.query(`DELETE FROM metrics WHERE date = $1;`, [deleteDate]));
            (await db.query(`DELETE FROM mytable WHERE date = $1;`, [deleteDate]));

            res.status(200).json(response.success({ info: "Successfully deleted" }, "OK", res.statusCode));
        }
    } catch (e) {

        res.status(500).json(response.error(
            "Internal Server Error " + e, res.statusCode
        ));
    }

});


module.exports = router;