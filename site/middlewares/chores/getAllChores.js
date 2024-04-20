/*Fetches all chores from the database for the family of the currently logged in user
 * The result is saved to res.locals.allChores
 * If there are no family members, res.locals.allChores will be an empty array
 */
module.exports = (objectRepository) => {
  const ChoreModel = objectRepository.ChoreModel;
  return async (req, res, next) => {
    try {
      const allChores = [];
      for (const member of res.locals.allFamilyMembers) {
        const chores = await ChoreModel.find({ _familyMember: member._id });
        allChores.push(...chores);
      }
      res.locals.allChores = allChores;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};