// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  return res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

app.get("/api/:date", (req, res) => {
  // console.log(req.params)
  const { date } = req.params;
  
  let paramsDate = date
  if(/\d{4}-\d{2}-\d{2}/.test(date)){
    paramsDate = date
  } else if(/\d{13}/.test(date)) {
    paramsDate = Number(date)
  }
  
  const newDate = new Date(paramsDate)
  const ms = newDate.getTime()
  
  if(newDate.toString() == "Invalid Date") {
    return res.json({error: "Invalid Date"});
  }

  res.json({
    unix: ms,
    utc: newDate.toUTCString()
  })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
