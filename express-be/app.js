var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // cors
var express = require('express');
var app = express();

const fs = require('fs');
const port = process.env.PORT || 9001;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors()); // cors
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/fingerprint/api/get', (req, res) => {
  res.send('Hello World!')
})

const {
  FingerprintJsServerApiClient,
  Region,
} = require('@fingerprintjs/fingerprintjs-pro-server-api');

const client = new FingerprintJsServerApiClient({
  apiKey: 'cQmQx7YYppwjWbQNbxMm',
  region: Region.Global,
})

// Get visit history of a specific visitor
// client.getVisitorHistory('<visitorId>').then((visitorHistory) => {
//   console.log(visitorHistory);
// });

app.post('/fingerprint/api/post', (req, res) => {
  // res.send('POST request to the homepage') // then in React use .text()
  if (req.body.data) {
    console.log(req.body.data);
    const fileContent = fs.readFileSync('data.json');
    const data = JSON.parse(fileContent);
    data.requestId = req.body.data;
    fs.writeFile("data.json", JSON.stringify(data), (err) => err && console.error(err));

    // Get a specific identification event
    client.getEvent(req.body.data).then((event) => {
      console.log(event);
      res.send(event)
    });
  }
})

app.listen(port, () => {
  console.log(`express-be listening on port ${port}`)
})

// var testAPIRouter = require("./routes/testAPI"); // test route
// app.use('/testAPI', testAPIRouter); // test route

module.exports = app;
