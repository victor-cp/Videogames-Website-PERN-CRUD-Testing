require("dotenv").config();
const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const router = Router();

// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos

// Add a videogame in databse
router.post("/", async (req, res) => {
  const { name, description, release_date, rating, platforms, genres, image } =
    req.body;
  try {
    if (!name || !description) throw Error("Falta enviar datos obligatorios");
    const newVideogame = await Videogame.create({
      name,
      description,
      image,
      release_date,
      rating: parseFloat(rating),
      platforms,
    });
    for (const genre of genres) {
      const putGenre = await Genre.findOne({ where: { name: genre } });
      await newVideogame.addGenre(putGenre);
    }

    // console.log(newVideogame);

    res.status(200).json({
      message: "Create Successfully",
      id: `${newVideogame.id}`,
      name,
      description,
      image,
      release_date,
      rating,
      platforms,
      genres,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

router.get("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;
    let detailGame;
    if (!idVideogame.includes("-")) {
      detailGame = await axios
        .get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
        .then((res) => res.data)
        .then((res) => ({
          id: res.id,
          name: res.name,
          release_date: res.released,
          image: res.background_image,
          rating: res.rating,
          description: res.description,
          platforms: res.platforms
            .map((platform) => platform.platform.name)
            .join(", "),
          genres: res.genres.map((genre) => genre.name).join(", "),
        }));
    } else {
      const detailGameDB = await Videogame.findOne({
        where: { id: idVideogame },
        include: {
          model: Genre,
        },
      });
      const res = detailGameDB.dataValues;

      const res_ = {
        id: res.id,
        name: res.name,
        release_date: res.release_date,
        image: res.image,
        rating: res.rating,
        description: res.description,
        platforms: res.platforms.join(", "),
        genres: res.genres.map((genre) => genre.name).join(", "),
      };
      detailGame = res_;
    }

    // console.log(detailGame);
    res.status(200).json(detailGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Additional ///////////////////////////////////////

// [ ] DELETE /videogame/{idVideogame}:
// Eliminar videojuego de la base de datos

router.delete("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const user = await Videogame.findByPk(idVideogame);
    user.destroy();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// [ ] PUT /videogame/{idVideogame}:
// Eliminar videojuego de la base de datos

router.put("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  const { name, description, release_date, rating, platforms, genres, image } =
    req.body;
  try {
    const videogame = await Videogame.findByPk(idVideogame);
    videogame.name = name;
    videogame.description = description;
    videogame.release_date = release_date;
    videogame.rating = rating;
    videogame.platforms = platforms;
    videogame.image = image;

    // console.log(genres);

    // var filter = {
    //   where: {
    //     id: idVideogame,
    //   },
    //   include: [{ model: Genre }],
    // };
    // const puGenre = await Genre.findOne(filter);
    // console.log(puGenre);
    // await videogame.updateAttribute(genres);
    // await upGenre.setGenre(genres);
    // for (const genre of genres) {
    //   const putGenre = await Genre.findOne({ where: { name: genre } });
    //   await videogame.addGenre(putGenre);
    // }

    if (idVideogame) await videogame.save();
    res.json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
