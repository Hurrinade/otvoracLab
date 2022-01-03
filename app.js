const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { auth } = require('express-openid-connect');

const homeRouter = require('./routes/home-router');
const tableRouter = require('./routes/table-router');
const apiRouter = require('./routes/api-router');
const response = require('./accessories/response');
const login = require('./routes/login')
const userProfile = require('./routes/user-profile')

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'PQkM553xyrbq8XV2d3L8f2zb5cpNw6gG',
    issuerBaseURL: 'https://dev-xjz1miq8.us.auth0.com'
};

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(auth(config));

app.use('/', login);
app.use('/profile', userProfile)
app.use('/home', homeRouter);
app.use('/datatable', tableRouter);
app.use('/v1', apiRouter);

app.use('*', function (req, res) {
    res.status(404).json(response.error("NOT FOUND", res.statusCode));
});

app.listen(3000);