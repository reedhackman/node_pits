const gameQueries = require("../db/queries/games");
const playerQueries = require("../db/queries/player");

const parseGame = async game => {
  if (game.p1_id < 1 || game.p2_id < 1) return;
  game.game_status === 100
    ? await processComplete(game)
    : await processIncomplete(game);
};

const processComplete = async game => {
  let winnerId;
  let winnerName;
  let winnerP;
  let loserId;
  let loserName;
  let loserP;
  if (game.p1_points === game.p2_points) {
    // draw
    return;
  } else if (game.p1_points > game.p2_points) {
    winnerId = game.p1_id;
    winnerName = game.p1_name;
    winnerP = "p1";
    loserId = game.p2_id;
    loserName = game.p2_name;
    loserP = "p2";
  } else {
    winnerId = game.p2_id;
    winnerName = game.p2_name;
    winnerP = "p2";
    loserId = game.p1_id;
    loserName = game.p1_name;
    loserP = "p1";
  }
  let winner = await playerQueries.getPlayer(winnerId, winnerName);
  let loser = await playerQueries.getPlayer(loserId, loserName);
  processPlayerChange(winner, loser);
  await gameQueries.createComplete(game, winnerP, loserP);
  await playerQueries.updatePlayer(winnerId, winner);
  await playerQueries.updatePlayer(loserId, loser);
};

const processPlayerChange = (winner, loser) => {
  winner.wins++;
  loser.losses++;
  updateRating(winner, loser);
  return [winner, loser];
};

const updateRating = (winner, loser) => {
  const k = 40;
  const qW = Math.pow(10, winner.rating / 400);
  const qL = Math.pow(10, loser.rating / 400);
  const eW = qW / (qW + qL);
  const eL = qL / (qW + qL);
  winner.rating = winner.rating + k * (1 - eW);
  loser.rating = loser.rating + k * (0 - eL);
};

const processIncomplete = async game => {
  await gameQueries.createIncomplete(game);
};

module.exports = {
  parseGame: parseGame
};
