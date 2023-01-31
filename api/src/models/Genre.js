const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "genre",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          isIn: [
            [
              "Action",
              "Indie",
              "Adventure",
              "RPG",
              "Strategy",
              "Shooter",
              "Casual",
              "Simulation",
              "Puzzle",
              "Arcade",
              "Platformer",
              "Racing",
              "Massively Multiplayer",
              "Sports",
              "Fighting",
              "Family",
              "Board Games",
              "Educational",
              "Card",
            ],
          ],
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
