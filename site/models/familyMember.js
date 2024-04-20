const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const FamilyMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  age: Number,
  email: String,
  password: String,
  _family: {
    type: Schema.Types.ObjectId,
    ref: "Family",
  },
});

FamilyMemberSchema.pre("save", function (next) {
  var familyMember = this;

  // only hash the password if it has been modified (or is new)
  if (!familyMember.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(familyMember.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      familyMember.password = hash;
      next();
    });
  });
});

FamilyMemberSchema.methods.comparePasswords = function(inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password);
};

const FamilyMember = mongoose.model("FamilyMember", FamilyMemberSchema);

module.exports = FamilyMember;
