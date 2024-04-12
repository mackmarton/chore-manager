/*Fetches all family members from the database
 * The result is saved to res.locals.allFamilyMembers
 * If there are no family members, res.locals.allFamilyMembers will be an empty array
 */
module.exports = (objectRepository) => {
  return (req, res, next) => {
    res.locals.allFamilyMembers = [
      {
        _id: "id1",
        name: "John",
        role: "Father",
        age: 51,
      },
      {
        _id: "id2",
        name: "Jane",
        role: "Mother",
        age: 49,
      },
      {
        _id: "id3",
        name: "Jack",
        role: "Son",
        age: 23,
      },
      {
        _id: "id4",
        name: "Jill",
        role: "Daughter",
        age: 20,
      },
    ];

    next();
  };
};
