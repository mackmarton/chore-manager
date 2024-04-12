/*Renders a page with the given template and data*/
module.exports = (objectRepository, viewName) => {
  return (req, res, next) => {
    res.render(viewName, res.locals);
  };
};
