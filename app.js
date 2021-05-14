const express = require("express");
const events = require('events');
const path = require('path');
const routes = require('./routes');
var app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine','ejs');

const middleware = [
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded({ extended: true }),
    cookieParser()
]

app.use(middleware);
app.use('/',routes);

app.use((err,req,res,next) => {
    console.error(err.stack);
});

app.listen(3000,() => {
    console.log("Hello World");
});

