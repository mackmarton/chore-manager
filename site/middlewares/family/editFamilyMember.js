/* Add/edit family member to/in the database
 * If req.body is empty it does nothing aka. returns next()
 * Redirects to /family if successful
 */
module.exports = (objectRepository) => {
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return (req, res, next) => {
    if (
      /*typeof req.body._id === "undefined" ||*/
      typeof req.body.name === "undefined" ||
      typeof req.body.role === "undefined" ||
      typeof req.body.age === "undefined"
    ) {
      return next();
    }

    console.log(res.locals.familyMember);

    let familyMember;
    if (res.locals.familyMember !== undefined) {
      familyMember = res.locals.familyMember;
    } else {
      throw new Error("Family member not found");
    }

    familyMember.name = req.body.name;
    familyMember.role = req.body.role;
    familyMember.age = req.body.age;

    return familyMember
      .save()
      .then(() => {
        return res.redirect("/family");
      })
      .catch((err) => {
        return next(err);
      });
  };
};
