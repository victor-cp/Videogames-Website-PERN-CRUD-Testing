const { Genre, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("-- Genre model ----------------------------------------", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Genre.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name not is a STRING.", (done) => {
        Genre.create({
          id: 1,
          name: 1, // validation
        })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it('should work when its a valid name "Action", "Indie", "Adventure", "RPG", "Strategy", "Shooter", "Casual", "Simulation, "Puzzle", "Arcade", "Platformer", "Racing", "Massively Multiplayer", "Sports", "Fighting", "Family", "Board Games", "Educational", "Card".', (done) => {
        Genre.create({ name: "Action" })
          .then(() => done())
          .catch(() => done(new Error("It requires a valid name")));
      });
      it("should work when its NOT a valid name.", (done) => {
        Genre.create({ name: "Genre x" })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
    });
  });
});
