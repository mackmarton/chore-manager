/* Add/edit chore to/in the database
 * If req.body is empty it does nothing aka. returns next()
 * Redirects to /chores if successful
 */
module.exports = (objectRepository) => {
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
    //TODO: save chore to database
    res.redirect("/chores");
  };
};
