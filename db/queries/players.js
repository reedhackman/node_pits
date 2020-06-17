const db = require("../../db");

const numPlayers = async () => {
  try {
    const query = `SELECT COUNT(*) FROM players`;
    const res = await db.query(query, []);
    const data = res.rows[0].count;
    return parseInt(data);
  } catch (err) {
    throw err;
  }
};

const listPlayers = async () => {
  try {
    const res = await db.query("SELECT * FROM players", []);
    const data = res.rows;
    return data;
  } catch (err) {
    throw err;
  }
};

const paginateSortPlayers = async (page, perPage, sort, sortDirection) => {
  try {
    const sortQuery = sort === "opponents" ? "cardinality(opponents)" : sort;
    const query = `SELECT * FROM players ORDER BY ${sortQuery} ${sortDirection} LIMIT ${perPage} OFFSET ${(page -
      1) *
      perPage}`;
    const res = await db.query(query, []);
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
        losses: 0,
        played: 0,
        percent: 0,
        opponents: []
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
      "INSERT INTO players (id, name, wins, losses, rating, played, percent, opponents) VALUES ($1, $2, 0, 0, 1200, 0, 0, '{}')",
      [id, name]
    );
  } catch (err) {
    throw err;
  }
};

const updatePlayer = async player => {
  try {
    await db.query(
      "UPDATE players SET wins = $1, losses = $2, rating = $3, played = $5, percent = $6, opponents = $7 WHERE id = $4",
      [
        player.wins,
        player.losses,
        player.rating,
        player.id,
        player.played,
        player.percent,
        player.opponents
      ]
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getPlayer: getPlayer,
  updatePlayer: updatePlayer,
  listPlayers: listPlayers,
  paginateSortPlayers: paginateSortPlayers,
  numPlayers: numPlayers
};
