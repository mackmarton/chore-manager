/* Create new family for user without family
 * If successful redirects to /family
 * If user already has a family redirects to /family
 */

module.exports = (objectRepository) => {
  const FamilyModel = objectRepository.FamilyModel;
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return (req, res, next) => {
    if (req.session.familyMember._family !== undefined && req.session.familyMember._family !== null) {
      return res.redirect("/family");
    }

    const family = new FamilyModel();
    family.name = req.session.familyMember.name + "'s Family";

    family.save().then((savedFamily) => {
      return FamilyMemberModel.findOneAndUpdate(
        { _id: req.session.familyMember._id },
        { _family: savedFamily._id },
        { new: true }
      ).then((familyMember) => {
        req.session.familyMember = familyMember;
        return res.redirect("/family");
      });
    });
  };
};
