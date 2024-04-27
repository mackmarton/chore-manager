const getAllFamilyMembersMW = require("../middlewares/family/getAllFamilyMembers");
const getFamilyMemberById = require("../middlewares/family/getFamilyMemberById");
const getAllFamilyMembersWithNoFamilyMW = require("../middlewares/family/getAllFamilyMembersWithNoFamily");
const addMemberToFamilyMW = require("../middlewares/family/addMemberToFamily");
const createNewFamilyMW = require("../middlewares/family/createNewFamily");
const editFamilyMemberMW = require("../middlewares/family/editFamilyMember");
const deleteFamilyMemberMW = require("../middlewares/family/deleteFamilyMember");
const getAllChoresMW = require("../middlewares/chores/getAllChores");
const getChoreByIdMW = require("../middlewares/chores/getChoreById");
const saveChoreMW = require("../middlewares/chores/saveChore");
const deleteChoreMW = require("../middlewares/chores/deleteChore");
const renderMW = require("../middlewares/render");
const authMW = require("../middlewares/auth/auth");
const authFamilyStatusMW = require("../middlewares/auth/authFamilyStatus");
const reloadLoggedInFamilyMemberMW = require("../middlewares/auth/reloadLoggedInFamilyMember");
const registerFamilyMemberMW = require("../middlewares/auth/registerFamilyMember");
const checkLoginMW = require("../middlewares/auth/checkLogin");
const logoutMW = require("../middlewares/auth/logout");

const FamilyMemberModel = require("../models/familyMember");
const ChoreModel = require("../models/chore");
const FamilyModel = require("../models/family");

module.exports = function (app) {
  const objectRepository = {
    FamilyMemberModel,
    ChoreModel,
    FamilyModel,
  };

  app.get("/", renderMW(objectRepository, "index"));

  app.get(
    "/family",
    authMW(objectRepository),
    reloadLoggedInFamilyMemberMW(objectRepository),
    getAllFamilyMembersMW(objectRepository),
    renderMW(objectRepository, "family"),
  );

  app.use(
    "/family/new",
    authMW(objectRepository),
    reloadLoggedInFamilyMemberMW(objectRepository),
    authFamilyStatusMW(objectRepository),
    addMemberToFamilyMW(objectRepository),
    getAllFamilyMembersWithNoFamilyMW(objectRepository),
    renderMW(objectRepository, "add-family-member"),
  );

  app.get(
    "/family/create-family",
    authMW(objectRepository),
    reloadLoggedInFamilyMemberMW(objectRepository),
    createNewFamilyMW(objectRepository),
    addMemberToFamilyMW(objectRepository),
  );

  app.use(
    "/family/edit/:familyMemberId",
    authMW(objectRepository),
    reloadLoggedInFamilyMemberMW(objectRepository),
    authFamilyStatusMW(objectRepository),
    getFamilyMemberById(objectRepository),
    editFamilyMemberMW(objectRepository),
    renderMW(objectRepository, "edit-family-member"),
  );

  app.get(
    "/family/delete/:familyMemberId",
    authMW(objectRepository),
    reloadLoggedInFamilyMemberMW(objectRepository),
    authFamilyStatusMW(objectRepository),
    getFamilyMemberById(objectRepository),
    deleteFamilyMemberMW(objectRepository),
  );

  app.get(
    "/chores",
    authMW(objectRepository),
    reloadLoggedInFamilyMemberMW(objectRepository),
    authFamilyStatusMW(objectRepository),
    getAllFamilyMembersMW(objectRepository),
    getAllChoresMW(objectRepository),
    renderMW(objectRepository, "chores"),
  );

  app.use(
    "/chores/new",
    authMW(objectRepository),
    reloadLoggedInFamilyMemberMW(objectRepository),
    authFamilyStatusMW(objectRepository),
    saveChoreMW(objectRepository),
    getAllFamilyMembersMW(objectRepository),
    renderMW(objectRepository, "add-edit-chore"),
  );

  app.use(
    "/chores/edit/:choreId",
    authMW(objectRepository),
    reloadLoggedInFamilyMemberMW(objectRepository),
    authFamilyStatusMW(objectRepository),
    getChoreByIdMW(objectRepository),
    saveChoreMW(objectRepository),
    getAllFamilyMembersMW(objectRepository),
    renderMW(objectRepository, "add-edit-chore"),
  );

  app.get(
    "/chores/delete/:choreId",
    authMW(objectRepository),
    reloadLoggedInFamilyMemberMW(objectRepository),
    authFamilyStatusMW(objectRepository),
    getChoreByIdMW(objectRepository),
    deleteChoreMW(objectRepository),
  );

  app.use(
    "/login",
    checkLoginMW(objectRepository),
    renderMW(objectRepository, "login"),
  );

  app.use(
    "/register",
    registerFamilyMemberMW(objectRepository),
    renderMW(objectRepository, "register"),
  );

  app.get(
    "/logout",
    authMW(objectRepository),
    logoutMW(objectRepository)
  );

  app.use((err, req, res, next) => {
    res.locals.error = err;
    renderMW(objectRepository, "error")(err, req, res, next);
  });
};
