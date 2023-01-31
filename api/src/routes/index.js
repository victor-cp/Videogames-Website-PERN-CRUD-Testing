const { Router } = require("express");
// Importar todos los routers;
const videogameRouter = require("./videogameRouter");
const videogamesRouter = require("./videogamesRouter");
const genreRouter = require("./genreRouter");

const router = Router();

// Configurar los routers

router.use("/videogames", videogamesRouter);
// GET /videogames
// GET /videogames?name="..."

router.use("/genres", genreRouter);
// GET /genres

router.use("/videogame", videogameRouter);
// POST /videogame
// GET /videogame/{idVideogame}

module.exports = router;
