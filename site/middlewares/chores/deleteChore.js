/*Deletes a chore from the database
 * If successful redirects to /chores/
 */
module.exports = (objectRepository) => {
  return (req, res, next) => {
    //TODO: delete chore from database
    res.redirect("/chores");
  };
};
