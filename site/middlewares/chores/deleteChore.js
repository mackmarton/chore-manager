/*Deletes a chore from the database
 * If successful redirects to /chores/
 */
module.exports = (objectRepository) => {
  const ChoreModel = objectRepository.ChoreModel;
  return (req, res, next) => {

    if (res.locals.chore !== null) {
      return ChoreModel
        .deleteOne({ _id: req.params.choreId })
        .then(() => {
          res.redirect("/chores");
        })
        .catch((err) => {
          return next(err);
        });
    }

    res.redirect("/chores");
  };
};
