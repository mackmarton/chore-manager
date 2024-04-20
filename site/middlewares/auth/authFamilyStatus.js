/*If the logged in family members family is undefined or null the user gets redirected to /family in any other case the MW calls next*/
module.exports = (objectRepository) => {
  return (req, res, next) => {
    if (req.session.familyMember._family === undefined || req.session.familyMember._family === null) {
      return res.redirect("/family");
    }
    return next();
  };
};