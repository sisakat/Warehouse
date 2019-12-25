const PORT = 1234;
const REST_API_ROOT = '/api';

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const database = require('./config/dbconfig');

database.init();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(REST_API_ROOT, require('./routes/router'));

app.listen(PORT, () => {
    console.log("Server is listening on port: " + PORT)
});