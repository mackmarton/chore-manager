/* Reload the currently logged in family member */
module.exports = (objectRepository) => {
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return (req, res, next) => {
    if (req.session.familyMember === undefined || req.session.familyMember === null) {
      throw new Error("Family member not logged in");
    }

    FamilyMemberModel.findById(req.session.familyMember._id).then((familyMember) => {
      req.session.familyMember = familyMember;
      return next();
    });
  };
};