/*Fetches all family members from the database
 * The result is saved to res.locals.allFamilyMembers
 * If there are no family members, res.locals.allFamilyMembers will be an empty array
 */
module.exports = (objectRepository) => {
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return (req, res, next) => {
    return FamilyMemberModel.find({})
      .then((familyMembers) => {
        res.locals.allFamilyMembers = familyMembers;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
