/* Add/edit chore to/in the database
* If req.body is empty it does nothing aka. returns next()
* Redirects to /chores if successful
*/
module.exports = (objectRepository) => {
    return (req, res, next) => {
        return next();
    };
}