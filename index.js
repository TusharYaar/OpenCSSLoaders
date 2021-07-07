require("dotenv").config();
const express = require("express"),
  request = require("request"),
  app = express(),
  bodyParser = require("body-parser"),
  myRoutes = require("./routes"),
  cors = require("cors");
  PORT = process.env.PORT || 3000;

  const whiteList = ['https://opencssloader.netlify.app',"https://opencssloader.tusharyaar.me/"];
  var corsOptions = {
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    optionsSuccessStatus: 200 
  }

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", myRoutes);
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});
app.get("/iamadmin", (req, res) => {
  res.sendFile("./public/moderator.html", { root: __dirname });
});
app.get("/getquote", (req, res) => {
  var url = "https://api.adviceslip.com/advice";
  request(url, (err, result, body) => {
    if (err) throw err;
    else {
      var red = JSON.parse(body);
      res.send(red.slip.advice);
    }
  });
});

app.post("*", (req, res) => {
  res.send("Not Found the Page you are looking for");
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
module.exports = app;