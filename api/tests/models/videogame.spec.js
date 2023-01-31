const { Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("-- Videogame model ----------------------------------------", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null.", (done) => {
        Videogame.create({
          name: null, // validation
          description: "Description",
          image: "",
          release_date: "",
          rating: 0,
          platforms: [],
        })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name.", (done) => {
        Videogame.create({ name: "Game 1", description: "Description 1" })
          .then(() => done())
          .catch(() => done(new Error("It requires a valid name")));
      });
    });
    describe("description", () => {
      it("should throw an error if description is null.", (done) => {
        Videogame.create({
          name: "game1",
          description: null, // validation
          image: "",
          release_date: "",
          rating: 0,
          platforms: [],
        })
          .then(() => done(new Error("It requires a valid description.")))
          .catch(() => done());
      });
      it("should work when its a valid description.", (done) => {
        Videogame.create({ name: "Game 1", description: "Description 1" })
          .then(() => done())
          .catch(() => done(new Error("It requires a valid name")));
      });
    });
    describe("release_date", () => {
      it("should throw an error if release_date not allow date strings.", (done) => {
        Videogame.create({
          name: "game1",
          description: "description",
          release_date: "abc", // validation
        })
          .then(() => done(new Error("It requires a valid description")))
          .catch(() => done());
      });
      it('should work when its a valid release_date - "YYYY-MM-DD".', (done) => {
        Videogame.create({
          name: "Game 1",
          description: "Description 1",
          release_date: "2011-12-01",
        })
          .then(() => done())
          .catch(() => done(new Error("It requires a valid name")));
      });
    });
    describe("rating", () => {
      it("should throw an error if rating is greater than 5 and less than 0.", (done) => {
        Videogame.create({
          name: "game1",
          description: "description",
          rating: 8, // validation
        })
          .then(() => done(new Error("It requires a valid description")))
          .catch(() => done());
      });
      it("should work when its a valid rating - float.", (done) => {
        Videogame.create({
          name: "Game 1",
          description: "Description 1",
          rating: 3.1,
        })
          .then(() => done())
          .catch(() => done(new Error("It requires a valid name")));
      });
    });
  });
});
