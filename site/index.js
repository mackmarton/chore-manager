const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static("static"));

// Load routing
require("./routes/index")(app);

app.listen(3000, function () {
  console.log("Listening on :3000");
});
