/*Fetches all family members from the database
* The result is saved to res.locals.allFamilyMembers
* If there are no family members, res.locals.allFamilyMembers will be an empty array
*/
module.exports = (objectRepository) => {
    return (req, res, next) => {
        return next();
    };
}