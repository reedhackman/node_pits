const fetch = require("node-fetch");

const get = async url => {
  try {
    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

const getGames = async page => {
  try {
    const url = `http://thejoustingpavilion.com/api/v3/games?page=${page}`;
    const res = await get(url);
    console.log(url, res.length);
    return res;
  } catch (err) {
    throw err;
  }
};

const getGamesByTournament = async (tournamentId, page) => {
  try {
    const url = `http://thejoustingpavilion.com/api/v3/games?tournament_id=${tournamentId}&page=${page}`;
    const res = await get(url);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getGames: getGames,
  getGamesByTournament: getGamesByTournament
};
