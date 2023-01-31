/* eslint-disable import/no-extraneous-dependencies */
const chai = require("chai");
const chaiHTTP = require("chai-http");
const app = require("../../src/app.js");

chai.should();
chai.use(chaiHTTP);

describe("-- Tasks DB -- CRUD --------------------------------", () => {
  describe("CRUD videogame - DB", () => {
    let id;

    /** POST Method */
    it("It should POST a new videogame", (done) => {
      const game = {
        name: "Game1",
        description: "desc1",
        image: "",
        release_date: "1-1-1",
        rating: 3.0,
        platforms: ["PC"],
        genres: ["Action"],
      };
      chai
        .request(app)
        .post("/videogame")
        .send(game)
        .end((err, res) => {
          res.should.have.status(200);
          id = res.body.id;
          //   console.log(res.body.id);
          done();
        });
    });
    it("It should NOT POST a new videogame when: game = null", (done) => {
      const game = {
        name: null,
        description: "desc1",
        image: "",
        release_date: "1-1-1",
        rating: 3.0,
        platforms: ["PC"],
        genres: ["Action"],
      };
      chai
        .request(app)
        .post("/videogame")
        .send(game)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("It should NOT POST a new videogame when: descrpition = null", (done) => {
      const game = {
        name: "Game1",
        description: null,
        image: "",
        release_date: "1-1-1",
        rating: 3.0,
        platforms: ["PC"],
        genres: ["Action"],
      };
      chai
        .request(app)
        .post("/videogame")
        .send(game)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    /** GET Method */
    it("It should GET a videogame by ID - DB", (done) => {
      chai
        .request(app)
        .get("/videogame/" + id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eq("Game1");
          res.body.should.have.property("description").eq("desc1");
          res.body.should.have.property("image").eq("");
          res.body.should.have.property("release_date").eq("1-1-1");
          res.body.should.have.property("rating").eq(3.0);
          res.body.should.have.property("platforms").eq("PC");
          res.body.should.have.property("genres");
          done();
        });
    });

    /** PUT Method */
    it("It should UPDATE a videogame by ID - DB", (done) => {
      const game = {
        name: "Game1-modified",
        description: "desc1-modified",
        image: "",
        release_date: "3-3-3",
        rating: 2.0,
        platforms: ["PC"],
      };
      chai
        .request(app)
        .put("/videogame/" + id)
        .send(game)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eq("Game1-modified");
          res.body.should.have.property("description").eq("desc1-modified");
          res.body.should.have.property("image").eq("");
          res.body.should.have.property("release_date").eq("3-3-3");
          res.body.should.have.property("rating").eq(2.0);
          res.body.should.have.property("platforms");
          done();
        });
    });

    /** DELETE Method */
    it("It should DELETE a videogame by ID - DB", (done) => {
      chai
        .request(app)
        .delete("/videogame/" + id)
        .send(id)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("It SHOULDN'T DELETE a videogame of a non-existing id  - DB", (done) => {
      const id2 = 500;
      chai
        .request(app)
        .delete("/videogame/" + id2)
        .send(id)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
