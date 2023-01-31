require("dotenv").config();
const { Router } = require("express");
const { Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const router = Router();

// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get("/", async (req, res) => {
  try {
    const apiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = apiGenres.data.results.map((name) => ({
      name: name.name,
    }));
    Genre.bulkCreate(genres);
    if (genres.length === 0) throw Error("No se encuentran géneros en la bd");
    res.status(200).send(genres);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
