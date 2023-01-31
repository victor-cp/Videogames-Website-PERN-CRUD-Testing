require("dotenv").config();
const axios = require("axios");
const { Router } = require("express");
const { API_KEY } = process.env;

const { Op } = require("sequelize");

const { Videogame, Genre } = require("../db");
const { get } = require("./videogameRouter");

const router = Router();

// [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const getGamesBD = await Videogame.findAll({
        where: { name: { [Op.substring]: `${name}` } },
        include: {
          model: Genre,
        },
      });
      const games = getGamesBD
        .map((game) => game.dataValues)
        .map((game) => ({
          id: game.id,
          name: game.name,
          release_date: game.release_date,
          image: game.image,
          rating: game.rating,
          platforms: game.platforms,
          genres: game.genres.map((p) => p.name).join(", "),
          source: "db",
        }));

      const getGames = await axios
        .get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        .then((res) => res.data);

      let arrGames = getGames.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          genres: game.genres.map((genre) => genre.name).join(", "),
          rating: game.rating,
          image: game.background_image,
          platforms: game.platforms
            .map((elem) => elem.platform.name)
            .join(", "),
          source: "api",
        };
      });

      res.status(200).send(games.concat(arrGames));
    } else {
      let api = `https://api.rawg.io/api/games?key=${API_KEY}`;
      let arr = [];
      for (let i = 0; i < 5; i++) {
        const videogamesApi = await axios.get(api).then((res) => res.data);

        const videogames = videogamesApi.results.map((game) => {
          return (data = {
            id: game.id,
            name: game.name,
            genres: game.genres.map((genre) => genre.name).join(", "),
            rating: game.rating,
            image: game.background_image,
            platforms: game.platforms.map((elem) => elem.platform.name),
            source: "api",
          });
        });
        api = videogamesApi.next;
        arr = arr.concat(videogames);
      }

      const getGamesBD = await Videogame.findAll({
        include: {
          model: Genre,
        },
      });

      const gamesBD = getGamesBD.map((getGame) => {
        const arrgenres = getGame.genres.map((genre) => genre.dataValues.name);
        // console.log(genresss0);
        const game = {
          id: getGame.id,
          name: getGame.name,
          release_date: getGame.release_date,
          image: getGame.image,
          rating: getGame.rating,
          description: getGame.description,
          platforms: getGame.platforms,
          genres: arrgenres.join(", "),
          // genres: getGame.genres,
          source: "db",
        };
        return game;
      });
      // console.log(gamesBD[0].genres);
      // genresss0 = getGamesBD[0].genres.map((genre) => genre.dataValues.name);
      // genresss1 = getGamesBD[1].genres.map((genre) => genre.dataValues.name);
      // console.log(getGamesBD[0].genres[1].dataValues.name);
      // console.log(gamesBD[0].genres);
      // console.log(genresss0);
      // console.log(genresss1);
      // console.log(gamesBD[0]);
      res.status(200).json(gamesBD.concat(arr));
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
