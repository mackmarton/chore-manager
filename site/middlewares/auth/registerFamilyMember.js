/* Register a family member with an email and password
 * Checks whether the email is already in use, if not registers the family member else sends an error through res.locals.error
 * Checks whether password and confirmPassword are the same, if not sends an error through res.locals.error
 * If createFamily is true, creates a new family and adds the family member to it
 * If successful logs user in and redirects to /family if successful
 */

module.exports = (objectRepository) => {
  const FamilyModel = objectRepository.FamilyModel;
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return (req, res, next) => {
    if (
      typeof req.body.name === "undefined" ||
      typeof req.body.age === "undefined" ||
      typeof req.body.role === "undefined" ||
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined" ||
      typeof req.body.confirmPassword === "undefined"
    ) {
      return next();
    }

    if (req.body.password !== req.body.confirmPassword) {
      res.locals.error = "Passwords do not match";
      return next();
    }

    FamilyMemberModel.findOne({ email: req.body.email })
      .then(async (existingFamilyMember) => {
        if (existingFamilyMember !== null) {
          res.locals.error = "Email is already in use";
          return next();
        }

        const familyMember = new FamilyMemberModel();
        familyMember.name = req.body.name;
        familyMember.age = req.body.age;
        familyMember.role = req.body.role;
        familyMember.email = req.body.email;
        familyMember.password = req.body.password;

        if (
          req.body.createFamily !== undefined &&
          req.body.createFamily === "true"
        ) {
          const family = new FamilyModel();
          family.name = req.body.name + "'s Family";
          try {
            const savedFamily = await family.save();
            familyMember._family = savedFamily._id;
          } catch (err) {
            return next(err);
          }
        }

        familyMember
          .save()
          .then(() => {
            req.session.familyMember = familyMember;
            return res.redirect("/family");
          })
          .catch((err) => {
            return next(err);
          });
      })
      .catch((err) => {
        return next(err);
      });
  };
};

