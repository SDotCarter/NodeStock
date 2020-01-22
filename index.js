// Stock Market Portfolio App by Sean Carter

const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const request = require("request");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

// Use Body Parser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// API Key: pk_8d01384bb33b4916a0ede2daaf9099bc
// Create Call_API Function

function call_api(finishedAPI, ticker) {
  request(
    "https://sandbox.iexapis.com/stable/stock/" +
      ticker +
      "/quote?token=Tpk_f5e0c1e4845442e283818f521cbd572a",
    {
      json: true
    },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      if (res.statusCode === 200) {
        //   console.log(body);
        finishedAPI(body);
      }
    }
  );
}

//Set Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const otherStuff = "Hello there, this is other stuff.";

//Set Handlebar Index GET Route
app.get("/", function(req, res) {
  call_api(function(doneAPI) {
    res.render("home", {
      stock: doneAPI
    });
  }, "fb");
});

//Set Handlebar Index POST Route
app.post("/", function(req, res) {
  call_api(function(doneAPI) {
    // posted_stuff = req.body.stock_ticker;
    res.render("home", {
      stock: doneAPI
    });
  }, req.body.stock_ticker);
});

// Create About Page Route
app.get("/about.html", function(req, res) {
  res.render("about");
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server listening on port " + PORT));
