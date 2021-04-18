const express = require("express");

//const bodyParser = require("body-parser");

const upload = require("./routes/upolad");
const download = require("./routes/download");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes in here

app.use(upload);
app.use(download);

app.listen(3000);
