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

module.exports = {
  createComplete: createComplete,
  createIncomplete: createIncomplete,
};
