const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Family = db.model("Family", {
  name: String,
});

module.exports = Family;
