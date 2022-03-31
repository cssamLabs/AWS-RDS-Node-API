//1.  Setup load modules
const express = require('express')
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const cors = require("cors");
const app = express();

const config = require('./config/config');
let allowList = config.allowList;
// console.log(allowList)
let corsOptionsDelegate = function (req, callback) {
    let header_origin = req.header('Origin')
    // console.log('header_origin: '+header_origin)
    let corsOptions;
    if (allowList.indexOf(header_origin) !== -1) {
        corsOptions = { origin: header_origin } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

// body parser middleware
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept');
    if ('OPTIONS' == req.method) {
        res.status(200).end();
    } else {
        next();
    }
});
const urlshortRoute = require('./routes/urlshort.route')
app.use("/api", cors(corsOptionsDelegate), urlshortRoute);

// set port, listen for requests
app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}.`);
});
