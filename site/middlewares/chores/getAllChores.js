/*Fetches all chores from the database
 * The result is saved to res.locals.allChores
 * If there are no family members, res.locals.allChores will be an empty array
 */
module.exports = (objectRepository) => {
  return (req, res, next) => {
    res.locals.allChores = [
      {
        _id: "id1",
        name: "Clean the kitchen",
        dueDate: new Date("2024-04-18"),
        priority: 2,
        familyMemberId: "id1",
      },
      {
        _id: "id2",
        name: "Do the laundry",
        dueDate: new Date("2024-04-19"),
        priority: 9,
        familyMemberId: "id2",
      },
      {
        _id: "id3",
        name: "Take out the trash",
        dueDate: new Date("2024-04-20"),
        priority: 3,
        familyMemberId: "id3",
      },
      {
        _id: "id4",
        name: "Mow the lawn",
        dueDate: new Date("2024-04-23"),
        priority: 2,
        familyMemberId: "id4",
      },
    ];
    next();
  };
};
