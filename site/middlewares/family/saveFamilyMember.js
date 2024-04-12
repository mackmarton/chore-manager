/* Add/edit family member to/in the database
 * If req.body is empty it does nothing aka. returns next()
 * Redirects to /family if successful
 */
module.exports = (objectRepository) => {
  return (req, res, next) => {
    if (
      typeof req.body._id === "undefined" ||
      typeof req.body.name === "undefined" ||
      typeof req.body.role === "undefined" ||
      typeof req.body.age === "undefined"
    ) {
      return next();
    }
    //TODO: save family member to database
    res.redirect("/family");
  };
};
