const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(req.oidc.isAuthenticated() ? path.resolve('views/index.html') : path.resolve('views/login.html'));
});

module.exports = router;