const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static("static"));

app.use(
  session({
    secret: 'secret'
  })
);

// Load routing
require("./routes/index")(app);

app.listen(3000, function () {
  console.log("Listening on :3000");
});
