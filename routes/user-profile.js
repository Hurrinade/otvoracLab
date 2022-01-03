const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.json(req.oidc.isAuthenticated() ? { data: req.oidc.user } : { data: null });
});


module.exports = router;