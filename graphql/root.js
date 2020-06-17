const playerQueries = require("../db/queries/players");
const deckQueries = require("../db/queries/decks");
const gameQueries = require("../db/queries/games");

var root = {
  games: async () => {
    try {
      const games = await gameQueries.listComplete();
      return games;
    } catch (err) {
      throw err;
    }
  },
  players: async () => {
    try {
      const players = await playerQueries.listPlayers();
      return players;
    } catch (err) {
      throw err;
    }
  },
  playerTable: async ({ page, perPage, sort, sortDirection }) => {
    try {
      const players = await playerQueries.paginateSortPlayers(
        page,
        perPage,
        sort,
        sortDirection
      );
      return players;
    } catch (err) {
      throw err;
    }
  },
  numPlayers: async () => {
    try {
      const numPlayers = await playerQueries.numPlayers();
      return numPlayers;
    } catch (err) {
      throw err;
    }
  },
  player: async ({ id }) => {
    try {
      let player = await playerQueries.getPlayer(id);
      const games = await gameQueries.byPlayer(id);
      player.games = games;
      return player;
    } catch (err) {
      throw err;
    }
  },
  decks: async () => {
    try {
      const decks = await deckQueries.listDecks();
      return decks.filter(deck => deck.agenda);
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
  }
};

module.exports = { root };
