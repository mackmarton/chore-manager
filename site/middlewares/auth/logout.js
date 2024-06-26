/* Destroy current session for the user and redirect to main page*/

module.exports = function(objectRepository) {
  return function(req, res, next) {
    req.session.destroy(err => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  };
};