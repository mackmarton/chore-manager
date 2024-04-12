const getAllFamilyMembersMW = require("../middlewares/family/getAllFamilyMembers");
const getFamilyMemberById = require("../middlewares/family/getFamilyMemberById");
const saveFamilyMemberMW = require("../middlewares/family/saveFamilyMember");
const deleteFamilyMemberMW = require("../middlewares/family/deleteFamilyMember");
const getAllChoresMW = require("../middlewares/chores/getAllChores");
const getChoreByIdMW = require("../middlewares/chores/getChoreById");
const saveChoreMW = require("../middlewares/chores/saveChore");
const deleteChoreMW = require("../middlewares/chores/deleteChore");
const renderMW = require("../middlewares/render");

module.exports = function (app) {
  const objectRepository = {};

  app.get("/", renderMW(objectRepository, "index"));

  app.get(
    "/family",
    getAllFamilyMembersMW(objectRepository),
    renderMW(objectRepository, "family"),
  );

  app.use(
    "/family/new",
    saveFamilyMemberMW(objectRepository),
    renderMW(objectRepository, "add-edit-family-member"),
  );

  app.use(
    "/family/edit/:familyMemberId",
    saveFamilyMemberMW(objectRepository),
    getFamilyMemberById(objectRepository),
    renderMW(objectRepository, "add-edit-family-member"),
  );

  app.get(
    "/family/delete/:familyMemberId",
    deleteFamilyMemberMW(objectRepository),
  );

  app.get(
    "/chores",
    getAllChoresMW(objectRepository),
    getAllFamilyMembersMW(objectRepository),
    renderMW(objectRepository, "chores"),
  );

  app.use(
    "/chores/new",
    saveChoreMW(objectRepository),
    getAllFamilyMembersMW(objectRepository),
    renderMW(objectRepository, "add-edit-chore"),
  );

  app.use(
    "/chores/edit/:choreId",
    saveChoreMW(objectRepository),
    getChoreByIdMW(objectRepository),
    getAllFamilyMembersMW(objectRepository),
    renderMW(objectRepository, "add-edit-chore"),
  );

  app.get("/chores/delete/:choreId", deleteChoreMW(objectRepository));
};
