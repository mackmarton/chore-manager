var expect = require("chai").expect;
var authMW = require("../../../middlewares/auth/auth");

describe("auth middleware ", function () {
    it("should redirect to /login if user is not logged in", function (done) {
        const mw = authMW({});

        const res = {
            redirect: function (url) {
                expect(url).to.eql("/login");
                done();
            },
        };

        mw(
            {session: {familyMember: null}},
            res,
            function () {
            },
        );
    });

    it("should call next if user is logged in", function (done) {
        const mw = authMW({});

        mw(
            {session: {familyMember: {_id: "userId"}}},
            {},
            function () {
                done();
            },
        );
    });
});