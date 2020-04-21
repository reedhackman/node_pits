const gameQueries = require("../db/queries/games");
const playerQueries = require("../db/queries/player");

const processGames = async games => {
  for (var i = 0; i < games.length; i++) {
    await parseGame(games[i]);
  }
};

const parseGame = async game => {
  if (game.p1_id < 1 || game.p2_id < 1) return;
  game.game_status === 100
    ? await processComplete(game)
    : await processIncomplete(game);
};

const processComplete = async game => {
  let winnerId;
  let winnerName;
  let loserId;
  let loserName;
  if (game.p1_points === game.p2_points) {
    // draw
    return;
  } else if (game.p1_points > game.p2_points) {
    winnerId = game.p1_id;
    winnerName = game.p1_name;
    loserId = game.p2_id;
    loserName = game.p2_name;
  } else {
    winnerId = game.p2_id;
    winnerName = game.p2_name;
    loserId = game.p1_id;
    loserName = game.p1_name;
  }
  let winner = await playerQueries.getPlayer(winnerId, winnerName);
  let loser = await playerQueries.getPlayer(loserId, loserName);
  processPlayerChange(winner, loser);
  await gameQueries.createComplete(
    game,
    winnerId,
    loserId,
    winner.rating,
    loser.rating
  );
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
  const newWinnerRating =
    Math.round(100 * (winner.rating + k * (1 - eW))) / 100;
  const newLoserRating = Math.round(100 * (loser.rating + k * (0 - eL))) / 100;
  winner.rating = newWinnerRating;
  loser.rating = newLoserRating;
};

const processIncomplete = async game => {
  await gameQueries.createIncomplete(game);
};

module.exports = {
  processGames: processGames
};
