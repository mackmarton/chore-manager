/*Deletes a family member from the family a.k.a sets the family member's family to undefined
 * Also deletes all assigned chores for the family member
 * If successful or family member does not exist redirects to /family
 */
module.exports = (objectRepository) => {
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  const ChoreModel = objectRepository.ChoreModel;
  return (req, res, next) => {
    if (res.locals.familyMember !== null) {
      return FamilyMemberModel.findOneAndUpdate(
        { _id: req.params.familyMemberId },
        { _family: null },
        { new: true },
      )
        .then((deletedFamilyMember) => {
          if (deletedFamilyMember._id.equals(req.session.familyMember._id)) {
            req.session.familyMember = deletedFamilyMember;
          }
          ChoreModel.deleteMany({
            _familyMember: deletedFamilyMember._id,
          })
            .then(() => {
              res.redirect("/family");
            })
            .catch((err) => {
              return next(err);
            });
        })
        .catch((err) => {
          return next(err);
        });
    }
    res.redirect("/family");
  };
};
