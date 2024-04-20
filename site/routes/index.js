const getAllFamilyMembersMW = require("../middlewares/family/getAllFamilyMembers");
const getFamilyMemberById = require("../middlewares/family/getFamilyMemberById");
const saveFamilyMemberMW = require("../middlewares/family/saveFamilyMember");
const deleteFamilyMemberMW = require("../middlewares/family/deleteFamilyMember");
const getAllChoresMW = require("../middlewares/chores/getAllChores");
const getChoreByIdMW = require("../middlewares/chores/getChoreById");
const saveChoreMW = require("../middlewares/chores/saveChore");
const deleteChoreMW = require("../middlewares/chores/deleteChore");
const renderMW = require("../middlewares/render");

const FamilyMemberModel = require("../models/familyMember");
const ChoreModel = require("../models/chore");

module.exports = function (app) {
  const objectRepository = {
    FamilyMemberModel,
    ChoreModel,
  };

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
    getFamilyMemberById(objectRepository),
    saveFamilyMemberMW(objectRepository),
    renderMW(objectRepository, "add-edit-family-member"),
  );

  app.get(
    "/family/delete/:familyMemberId",
    getFamilyMemberById(objectRepository),
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
    getChoreByIdMW(objectRepository),
    saveChoreMW(objectRepository),
    getAllFamilyMembersMW(objectRepository),
    renderMW(objectRepository, "add-edit-chore"),
  );

  app.get(
    "/chores/delete/:choreId",
    getChoreByIdMW(objectRepository),
    deleteChoreMW(objectRepository),
  );

  app.use((err, req, res, next) => {
    res.locals.error = err;
    renderMW(objectRepository, "error")(err, req, res, next);
  });
};
