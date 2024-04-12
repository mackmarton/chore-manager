/*Fetches a family member by id from the database
 * The result is saved to res.locals.familyMember
 * If the family member could not be found, res.locals.familyMember will be set to null
 */

module.exports = (objectRepository) => {
  return (req, res, next) => {
    res.locals.familyMember = {
      _id: req.params.familyMemberId,
      name: "John",
      role: "Father",
      age: 51,
    };
    next();
  };
};
