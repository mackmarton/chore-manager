const Schema = require("mongoose").Schema;
const db = require("../config/db");

const FamilyMember = db.model("FamilyMember", {
  name: String,
  role: String,
  age: Number,
});

module.exports = FamilyMember;
