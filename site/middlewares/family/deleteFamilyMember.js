/*Deletes a family member from the database
 * Also deletes all assigned chores for the family member
 * If successful or family member does not exist redirects to /family
 */
module.exports = (objectRepository) => {
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  const ChoreModel = objectRepository.ChoreModel;
  return (req, res, next) => {
    if (res.locals.familyMember !== null) {
      return FamilyMemberModel.deleteOne({ _id: req.params.familyMemberId })
        .then(() => {
          ChoreModel.deleteMany({
            _familyMember: req.params.familyMemberId,
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
