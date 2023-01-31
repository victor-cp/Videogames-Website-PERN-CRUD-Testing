/* eslint-disable import/no-extraneous-dependencies */
const chai = require("chai");
const chaiHTTP = require("chai-http");
const app = require("../../src/app.js");

chai.should();
chai.use(chaiHTTP);

describe("-- Genre -------------------------------------------", () => {
  describe("", () => {
    it("It should GET 19 genres.", (done) => {
      chai
        .request(app)
        .get("/genres")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eq(19);
          done();
        });
    });
    it("It shouldn't GET genres.", (done) => {
      chai
        .request(app)
        .get("/genres-error")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
