/*Ads new family members to family from req.body list
* If successful redirects to /family
* */
module.exports = (objectRepository) => {
  const FamilyModel = objectRepository.FamilyModel;
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return (req, res, next) => {
    if (typeof req.body.familyMembers === "undefined") {
      return next();
    }

    FamilyModel.findOne({ _id: req.session.familyMember._family })
      .then((family) => {
        if (family === null) {
          return next(new Error("Family not found"));
        }

        const familyMembers = typeof req.body.familyMembers === "string" ? [req.body.familyMembers] : req.body.familyMembers
        const promises = [];
        familyMembers.forEach((familyMemberId) => {
          promises.push(
            FamilyMemberModel.findOneAndUpdate(
              { _id: familyMemberId },
              { _family: family._id }
            )
          );
        });

        return Promise.all(promises);
      })
      .then(() => {
        return res.redirect("/family");
      })
      .catch((err) => {
        return next(err);
      });
  };
};