var expect = require('chai').expect;
var createNewFamilyMW = require('../../../middlewares/family/createNewFamily');

describe('createNewFamily middleware ', function () {
    it("should redirect to /family if user already has a family", function (done) {
      const mw = createNewFamilyMW({
        FamilyModel: {},
        FamilyMemberModel: {}
      });

      const res = {
        redirect: function (url) {
          expect(url).to.eql("/family");
          done();
        },
      };

      mw(
        { session: { familyMember: { _family: "familyId" } } },
        res,
        function () {},
      );
    });

  it("should create a new family for user currently without family", function (done) {
    var familyId = "newFamilyId";
    var familyMemberId = "familyMemberId";
    var familyMemberName = "familyMemberName";

    const FamilyModel = function() {
      this.save = function() {
        expect(this.name).to.eql(familyMemberName + "'s Family");
        return Promise.resolve({ _id: familyId });
      };
    };

    const mw = createNewFamilyMW({
      FamilyModel: FamilyModel,
      FamilyMemberModel: {
        findOneAndUpdate: function (filter, update, options) {
          expect(filter._id).to.eql(familyMemberId);
          expect(update._family).to.eql(familyId);
          expect(options.new).to.eql(true);
          return Promise.resolve({ _id: "familyMemberId" });
        },
      },
    });

    const res = {
      redirect: function (url) {
        expect(url).to.eql("/family");
        done();
      },
    };

    mw(
      {
        session: { familyMember: { _id: familyMemberId, _family: null, name: "familyMemberName" } },
      },
      res,
      function () {},
    );
  });
});