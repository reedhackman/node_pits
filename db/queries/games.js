const db = require("../../db");

const createComplete = async (game, winnerP, loserP) => {
  try {
    const res = await db.query(
      "INSERT INTO complete (id, tournament_id, tournament_date, winner_id, loser_id) VALUES ($1, $2, $3, $4, $5)",
      [
        game.game_id,
        game.tournament_id,
        game.tournament_date,
        game[winnerP + "_id"],
        game[loserP + "_id"]
      ]
    );
  } catch (err) {
    throw err;
  }
};

const createIncomplete = async game => {
  try {
    await db.query(
      "INSERT INTO incomplete (id, tournament_id) VALUES ($1, $2)",
      [game.game_id, game.tournament_id]
    );
  } catch (err) {
    throw err;
  }
};

// const tjp = async game => {
//   const params = [
//     "game_id",
//     "game_status",
//     "tournament_id",
//     "tournament_date",
//     "tournament_name",
//     "p1_id",
//     "p1_name",
//     "p1_faction",
//     "p1_agenda",
//     "p1_points",
//     "p2_id",
//     "p2_name",
//     "p2_faction",
//     "p2_agenda",
//     "p2_points"
//   ];
//   const query = `INSERT INTO tjp (${params.join(", ")}) VALUES (${params
//     .map((p, i) => "$" + (i + 1))
//     .join(", ")})`;
//   await db.query(query, params.map(key => game[key]));
// };
//
// const getTjp = async () => {
//   const query = "SELECT * FROM tjp ORDER BY game_id";
//   const res = await db.query(query, []);
//   const data = res.rows;
//   return data;
// };

module.exports = {
  createComplete: createComplete,
  createIncomplete: createIncomplete,
  tjp: tjp,
  getTjp: getTjp
};
