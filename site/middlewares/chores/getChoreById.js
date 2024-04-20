/*Fetches a chore family member by id from the database
 * The result is saved to res.locals.chore
 * If the chore could not be found, res.locals.chore will be set to null
 */
module.exports = (objectRepository) => {
  const ChoreModel = objectRepository.ChoreModel;
  return (req, res, next) => {
    return ChoreModel.findOne({ _id: req.params.choreId })
      .then((chore) => {
        res.locals.chore = chore;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
