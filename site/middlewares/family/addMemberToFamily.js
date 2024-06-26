/*Ads new family members to family from req.body list
 * If successful redirects to /family
 * */
module.exports = (objectRepository) => {
  const FamilyModel = objectRepository.FamilyModel;
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return async (req, res, next) => {
    try {
      if (typeof req.body.familyMembers === "undefined") {
        return next();
      }

      const family = await FamilyModel.findOne({
        _id: req.session.familyMember._family,
      });

      if (family === null) {
        return next(new Error("Family not found"));
      }

      const familyMembers =
        typeof req.body.familyMembers === "string"
          ? [req.body.familyMembers]
          : req.body.familyMembers;

      for (const familyMemberId of familyMembers) {
        await FamilyMemberModel.findOneAndUpdate(
          { _id: familyMemberId },
          { _family: family._id },
        );
      }

      return res.redirect("/family");
    } catch (err) {
      return next(err);
    }
  };
};
