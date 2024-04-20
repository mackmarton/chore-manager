/* Add/edit chore to/in the database
 * If req.body is empty it does nothing aka. returns next()
 * Redirects to /chores if successful
 */
module.exports = (objectRepository) => {
  const ChoreModel = objectRepository.ChoreModel;
  return (req, res, next) => {
    if (
      typeof req.body._id === "undefined" ||
      typeof req.body.name === "undefined" ||
      typeof req.body.dueDate === "undefined" ||
      typeof req.body.priority === "undefined" ||
      typeof req.body.familyMemberId === "undefined"
    ) {
      return next();
    }

    const chore =
      res.locals.chore !== undefined ? res.locals.chore : new ChoreModel();

    chore.name = req.body.name;
    chore.dueDate = req.body.dueDate;
    chore.priority = req.body.priority;
    chore._familyMember = req.body.familyMemberId;

    return chore
      .save()
      .then(() => {
        return res.redirect("/chores");
      })
      .catch((err) => {
        return next(err);
      });
  };
};
