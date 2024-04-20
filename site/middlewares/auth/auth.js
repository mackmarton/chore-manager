/*
 * If the user is authenticated, call next, otherwise redirect to /login
 */
module.exports = function (objectRepository) {
  return function (req, res, next) {
    if (
      req.session === undefined ||
      req.session.familyMember === undefined ||
      req.session.familyMember === null
    ) {
      return res.redirect("/login");
    }

    next();
  };
};
