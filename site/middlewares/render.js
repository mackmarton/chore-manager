/*Renders a page with the given template and data*/
module.exports = (objectRepository, viewName) => {
  if (viewName === "error") {
    return (err, req, res, next) => {
      res.render(viewName, res.locals);
    };
  }
  return (req, res, next) => {
    res.render(viewName, res.locals);
  };
};
