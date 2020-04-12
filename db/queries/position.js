const db = require("../../db");

const updatePosition = async (page, index) => {
  try {
    const query = "UPDATE position SET page = $1, index = $2";
    const params = [page, index];
    const res = await db.query(query, params);
    console.log(res);
  } catch (err) {
    throw err;
  }
};

const getPosition = async () => {
  try {
    const res = await db.query("SELECT page, index FROM position", []);
    const position = res.rows[0];
    return [position.page, position.index];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  update: updatePosition,
  get: getPosition
};
