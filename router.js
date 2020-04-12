const express = require("express");
const router = express.Router();

const PlayerRoutes = require("./routes/players");
router.use((req, res, next) => {
  console.log(Date.now());
  next();
});

router.get("/players", (req, res) => {
  const route = PlayerRoutes.all();
  res.send(route);
});

router.get("/players/:id", (req, res) => {
  const id = req.params.id;
  const route = PlayerRoutes.specific(id);
  res.send(route);
});

module.exports = router;
