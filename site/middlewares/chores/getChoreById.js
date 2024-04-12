/*Fetches a chore family member by id from the database
 * The result is saved to res.locals.chore
 * If the chore could not be found, res.locals.chore will be set to null
 */
module.exports = (objectRepository) => {
  return (req, res, next) => {
    res.locals.chore = {
      _id: req.params.choreId,
      name: "Clean the kitchen",
      dueDate: new Date("2024-04-18"),
      priority: 2,
      familyMemberId: "id1",
    };
    next();
  };
};
