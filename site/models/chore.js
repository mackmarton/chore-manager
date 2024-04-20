const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Chore = db.model("Chore", {
  name: String,
  dueDate: Date,
  priority: Number,
  _familyMember: {
    type: Schema.Types.ObjectId,
    ref: "FamilyMember",
  },
});

module.exports = Chore;
