/* eslint-disable import/no-extraneous-dependencies */
const chai = require("chai");
// const expect = require("chai").expect;
// const session = require("supertest-session");
const chaiHTTP = require("chai-http");
const app = require("../../src/app.js");
const Videogame = require("../../src/models/Videogame.js");
// var request = require("supertest")(app);
// const { Videogame, conn } = require("../../src/db.js");
// const request = require("supertest");
// const expect = require("expectacle");

// Assertion style
chai.should();
chai.use(chaiHTTP);

describe("-- Tasks API ----------------------------------------", () => {
  /** Test GET Route*/
  describe("GET /videogames", () => {
    it("It should GET all (100) videogames.", (done) => {
      chai
        .request(app)
        .get("/videogames")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eq(100);
          done();
        });
    });

    it("It should NOT GET all the videogames.", (done) => {
      chai
        .request(app)
        .get("/videogames-error") // Wrong id
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("GET /videogame/:idVideogame", () => {
    it("It should GET a videogame by ID - API", (done) => {
      const gameId = 1;
      chai
        .request(app)
        .get("/videogame/" + gameId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("description");
          res.body.should.have.property("image");
          res.body.should.have.property("release_date");
          res.body.should.have.property("rating");
          res.body.should.have.property("platforms");
          res.body.should.have.property("genres");
          done();
        });
    });
  });
});
