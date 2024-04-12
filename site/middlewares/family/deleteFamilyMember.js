/*Deletes a family member from the database
 * If successful redirects to /family/
 */
module.exports = (objectRepository) => {
  return (req, res, next) => {
    //TODO: delete family member from database
    res.redirect("/family");
  };
};
