const playerQueries = require("../db/queries/players");
const deckQueries = require("../db/queries/decks");

var root = {
  players: async () => {
    try {
      const players = await playerQueries.listPlayers();
      return players;
    } catch (err) {
      throw err;
    }
  },
  player: async ({ id }) => {
    try {
      const player = await playerQueries.getPlayer(id);
      return player;
    } catch (err) {
      throw err;
    }
  },
  decks: async () => {
    try {
      const decks = await deckQueries.listDecks();
      return decks.filter((deck) => deck.agenda);
    } catch (err) {
      throw err;
    }
  },
  deck: async ({ faction, agenda }) => {
    try {
      const deck = await deckQueries.getDeck(faction, agenda);
      return deck;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { root };
