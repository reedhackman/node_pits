const db = require("../../db");

const createComplete = async (
  game,
  winnerId,
  loserId,
  winnerRating,
  loserRating,
  winnerFaction,
  winnerAgenda,
  loserFaction,
  loserAgenda
) => {
  try {
    const res = await db.query(
      "INSERT INTO complete (id, tournament_id, tournament_date, winner_id, loser_id, winner_rating, loser_rating, winner_faction, winner_agenda, loser_faction, loser_agenda) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        game.game_id,
        game.tournament_id,
        game.tournament_date,
        winnerId,
        loserId,
        winnerRating,
        loserRating,
        winnerFaction,
        winnerAgenda,
        loserFaction,
        loserAgenda,
      ]
    );
  } catch (err) {
    throw err;
  }
};

const createIncomplete = async (game) => {
  try {
    await db.query(
      "INSERT INTO incomplete (id, tournament_id) VALUES ($1, $2)",
      [game.game_id, game.tournament_id]
    );
  } catch (err) {
    throw err;
  }
};

const listComplete = async () => {
  try {
    const res = await db.query("SELECT * FROM complete", []);
    const data = res.rows;
    return data;
  } catch (err) {
    throw err;
  }
};

// select w.id as "winner_id", w.name as "winner_name", l.id as "loser_id", l.name as "loser_name", winner_faction, winner_agenda, loser_faction, loser_agenda, tournament_date from complete left join players w on w.id = winner_id left join players l on l.id = loser_id where winner_id = 246 or loser_id = 246
const byPlayer = async (id) => {
  try {
    const res = await db.query(
      `SELECT tournament_date, winner_id, w.name AS "winner_name", loser_id, l.name AS "loser_name", winner_faction, winner_agenda, loser_faction, loser_agenda FROM complete LEFT JOIN players w ON w.id = winner_id LEFT JOIN players l ON l.id = loser_id WHERE winner_id = $1 OR loser_id = $1`,
      [id]
    );
    const data = res.rows;
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createComplete: createComplete,
  createIncomplete: createIncomplete,
  listComplete: listComplete,
  byPlayer: byPlayer,
};
