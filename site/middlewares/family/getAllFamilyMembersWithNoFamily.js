/* Query to get all family members with no family a.k.a. _family field null or undefined */
module.exports = (objectRepository) => {
  const FamilyMemberModel = objectRepository.FamilyMemberModel;
  return (req, res, next) => {
    return FamilyMemberModel.find({ _family: { $in: [null, undefined] } })
      .then((familyMembers) => {
        res.locals.familyMembersWithNoFamily = familyMembers;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};