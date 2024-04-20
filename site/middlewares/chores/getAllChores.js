/*Fetches all chores from the database
 * The result is saved to res.locals.allChores
 * If there are no family members, res.locals.allChores will be an empty array
 */
module.exports = (objectRepository) => {
  const ChoreModel = objectRepository.ChoreModel;
  return (req, res, next) => {
    return ChoreModel.find({})
      .then((chores) => {
        res.locals.allChores = chores;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
