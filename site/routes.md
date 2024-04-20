## Middlewares

- GetAllFamilyMembersMW - Fetches all family members from the database into `res.locals.allFamilyMembers`
- GetFamilyMemberByIdMW - Fetches a family member by id from the database into `res.locals.familyMember`
    - If the family member does not exist, it sets `res.locals.familyMember` to null
- SaveFamilyMemberMW - Adds or edits a family member to/in the database
    - If req.body is empty it does nothing aka. returns next()
    - If successful, redirects to /family/
- DeleteFamilyMemberMW - Deletes a family member from the database and redirects to /family Also deletes all assigned chores for the family member

- GetAllChoresMW - Fetches all chores from the database into `res.locals.allChores`
- GetChoreByIdMW - Fetches a chore by id from the database into `res.locals.chore`
    - If the chore does not exist, it sets `res.locals.chore` to null
- SaveChoreMW - Adds a chore to the database
    - If req.body is empty, it does nothing aka. returns next()
- DeleteChoreMW - Deletes a chore from the database and redirects to /chores/

- RenderMW - Renders a page with the given template and data

# Endpoints

## Endpoints for the landing page

- GET - Landing page with static content `/`
    - RenderMW(index.html)

## Endpoints for family members

- GET - Get all family members `/family/`
    - GetAllFamilyMembersMW
    - RenderMW(family.html)
- GET,POST - Add family member `/family/new`
    - SaveFamilyMemberMW
    - RenderMW(add-edit-family-member.html(add))
        - res.locals.familyMember is undefined
- GET,POST - Update family member `/family/edit/:memberid`
    - SaveFamilyMemberMW
    - GetFamilyMemberByIdMW
    - RenderMW(add-edit-family-member.html(edit))
        - res.locals.familyMember is the family member to be updated
        - if res.locals.familyMember is null, display a message that the family member does not exist
- GET - Delete family member `/family/delete/:memberid`
    - DeleteFamilyMemberMW

## Endpoints for chores

- GET - View all chores `/chores/`
    - GetAllChoresMW
    - GetAllFamilyMembersMW - needed to display the name of the family member who has the chore
    - RenderMW(chores.html)
- GET,POST - Add chore `/chores/new`
    - SaveChoreMW
    - GetAllFamilyMembersMW - needed to populate the dropdown for choosing the family member
    - RenderMW(add-edit-chore.html)
        - res.locals.chore is undefined
- GET,POST - Update chore `/chores/edit/:choreid`
    - SaveChoreMW
    - GetChoreByIdMW
    - GetAllFamilyMembersMW - needed to populate the dropdown for choosing the family member
    - RenderMW(add-edit-chore.html)
        - res.locals.chore is the chore to be updated
        - if res.locals.chore is null, display a message that the chore does not exist
- GET - Delete chore `/chores/delete/:choreid`
    - DeleteChoreMW