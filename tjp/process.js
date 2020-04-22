const gameQueries = require("../db/queries/games");
const playerQueries = require("../db/queries/player");
const deckQueries = require("../db/queries/decks");

const processGames = async (games) => {
  try {
    for (var i = 0; i < games.length; i++) {
      await parseGame(games[i]);
    }
  } catch (err) {
    throw err;
  }
};

const parseGame = async (game) => {
  try {
    if (game.p1_id < 1 || game.p2_id < 1) return;
    game.game_status === 100
      ? await processComplete(game)
      : await processIncomplete(game);
  } catch (err) {
    throw err;
  }
};

const processComplete = async (game) => {
  try {
    let [winner, winningDeck, loser, losingDeck] = await determineWinner(game);
    if (winner && loser) {
      if (winningDeck && losingDeck) {
        await processDeckChange(winningDeck, losingDeck);
      }
      await processPlayerChange(winner, loser);
      await createComplete(
        game,
        winner.id,
        loser.id,
        winner.rating,
        loser.rating,
        winningDeck,
        losingDeck
      );
    }
  } catch (err) {
    throw err;
  }
};

const createComplete = async (
  game,
  winnerId,
  loserId,
  winnerRating,
  loserRating,
  winningDeck,
  losingDeck
) => {
  try {
    let winningFaction, winningAgenda, losingFaction, losingAgenda;
    if (winningDeck && losingDeck) {
      winningFaction = winningDeck.faction;
      winningAgenda = winningDeck.agenda;
      losingFaction = losingDeck.faction;
      losingAgenda = losingDeck.agenda;
    }
    await gameQueries.createComplete(
      game,
      winnerId,
      loserId,
      winnerRating,
      loserRating,
      winningFaction,
      winningAgenda,
      losingFaction,
      losingAgenda
    );
  } catch (err) {
    throw err;
  }
};

const determineWinner = async (game) => {
  try {
    if (game.p1_points === game.p2_points) {
      return [null, null, null, null];
    }
    let winner, loser, winningDeck, losingDeck;
    if (game.p1_points > game.p2_points) {
      winner = await playerQueries.getPlayer(game.p1_id, game.p1_name);
      loser = await playerQueries.getPlayer(game.p2_id, game.p2_name);
      winningDeck = await getDeck(game.p1_faction, game.p1_agenda);
      losingDeck = await getDeck(game.p2_faction, game.p2_agenda);
    } else {
      winner = await playerQueries.getPlayer(game.p2_id, game.p2_name);
      loser = await playerQueries.getPlayer(game.p1_id, game.p1_name);
      winningDeck = await getDeck(game.p2_faction, game.p2_agenda);
      losingDeck = await getDeck(game.p1_faction, game.p1_agenda);
    }
    return [winner, winningDeck, loser, losingDeck];
  } catch (err) {
    throw err;
  }
};

const getDeck = async (faction, agenda) => {
  try {
    if (!faction && agenda !== "The Free Folk") {
      return;
    }
    const deck = await deckQueries.getDeck(faction, agenda);
    return deck;
  } catch (err) {
    throw err;
  }
};

const processDeckChange = async (winningDeck, losingDeck) => {
  try {
    winningDeck.wins++;
    losingDeck.losses++;
    await deckQueries.updateDeck(winningDeck);
    await deckQueries.updateDeck(losingDeck);
  } catch (err) {
    throw err;
  }
};

const processPlayerChange = async (winner, loser) => {
  try {
    winner.wins++;
    loser.losses++;
    updateRating(winner, loser);
    await playerQueries.updatePlayer(winner);
    await playerQueries.updatePlayer(loser);
  } catch (err) {
    throw err;
  }
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

const processIncomplete = async (game) => {
  try {
    await gameQueries.createIncomplete(game);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  processGames: processGames,
};
