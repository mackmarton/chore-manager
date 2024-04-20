/*Fetches a family member by id from the database
 * The result is saved to res.locals.familyMember
 * If the family member could not be found, res.locals.familyMember will be set to null
 */

module.exports = (objectRepository) => {
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return (req, res, next) => {
    return FamilyMemberModel.findOne({
      _id: req.params.familyMemberId,
      _family: req.session.familyMember._family,
    })
      .then((familyMember) => {
        res.locals.familyMember = familyMember;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
