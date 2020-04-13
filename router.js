const express = require("express");
const router = express.Router();

const playerRoutes = require("./routes/players");

router.use((req, res, next) => {
  console.log(Date.now());
  next();
});

router.get("/players", async (req, res) => {
  const route = await playerRoutes.all();
  res.send(route);
});

router.get("/players/:id", async (req, res) => {
  const id = req.params.id;
  const route = await playerRoutes.specific(id);
  res.send(route);
});

module.exports = router;
