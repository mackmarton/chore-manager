/* Check if user with given email and password exists in the database
 * If user does not exist, calls next with an error on res.locals.error
 * If successful logs user in and redirects to /family if successful
 */
module.exports = (objectRepository) => {
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return (req, res, next) => {
    if (
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined"
    ) {
      return next();
    }

    FamilyMemberModel.findOne({ email: req.body.email })
      .then((familyMember) => {
        if (
          familyMember === null ||
          !familyMember.comparePasswords(req.body.password)
        ) {
          res.locals.error = "Invalid email or password";
          return next();
        }

        req.session.familyMember = familyMember;
        return res.redirect("/family");
      })
      .catch((err) => {
        return next(err);
      });
  };
};
