const db = require("../../db");

const listPlayers = async () => {
  try {
    const res = await db.query("SELECT * FROM players", []);
    const data = res.rows;
    return data;
  } catch (err) {
    throw err;
  }
};

const getPlayer = async (id, name = null) => {
  try {
    const res = await db.query("SELECT * FROM players WHERE id = $1", [id]);
    const player = res.rows[0];
    if (!player) {
      await createPlayer(id, name);
      return {
        id: id,
        name: name,
        rating: 1200,
        wins: 0,
        losses: 0
      };
    }
    return player;
  } catch (err) {
    throw err;
  }
};

const createPlayer = async (id, name) => {
  try {
    await db.query(
      "INSERT INTO players (id, name, wins, losses, rating) VALUES ($1, $2, 0, 0, 1200)",
      [id, name]
    );
  } catch (err) {
    throw err;
  }
};

const updatePlayer = async (id, player) => {
  try {
    await db.query(
      "UPDATE players SET wins = $1, losses = $2, rating = $3 WHERE id = $4",
      [player.wins, player.losses, player.rating, player.id]
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getPlayer: getPlayer,
  updatePlayer: updatePlayer,
  listPlayers: listPlayers
};
