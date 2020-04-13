const db = require("../db");
const playerQueries = require("../db/queries/player");

const all = async () => {
  let res = await playerQueries.listPlayers();
  return res;
};

const specific = async id => {
  const res = await playerQueries.getPlayer(id);
  return res;
};

module.exports = {
  all: all,
  specific: specific
};
