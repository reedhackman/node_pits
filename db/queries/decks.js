const db = require("../../db");

const listDecks = async () => {
  try {
    const res = await db.query("SELECT * FROM decks", []);
    const decks = res.rows;
    return decks;
  } catch (err) {
    throw err;
  }
};

const getDeck = async (faction, agenda) => {
  try {
    const deck = !faction
      ? await getDeckNoFaction(agenda)
      : !agenda
      ? await getDeckNoAgenda(faction)
      : await getDeckFull(faction, agenda);
    return deck;
  } catch (err) {
    throw err;
  }
};

const getDeckNoFaction = async (agenda) => {
  try {
    const res = await db.query(
      "SELECT * FROM decks WHERE faction IS NULL AND agenda = $1",
      [agenda]
    );
    const deck = res.rows[0];
    if (!deck) {
      await createDeck(null, agenda);
      return {
        faction: null,
        agenda: agenda,
        wins: 0,
        losses: 0,
        played: 0,
        percent: 0,
      };
    }
    return deck;
  } catch (err) {
    throw err;
  }
};

const getDeckNoAgenda = async (faction) => {
  try {
    const res = await db.query(
      "SELECT * FROM decks WHERE faction = $1 AND agenda IS NULL",
      [faction]
    );
    const deck = res.rows[0];
    if (!deck) {
      await createDeck(faction, null);
      return {
        faction: faction,
        agenda: null,
        wins: 0,
        losses: 0,
        played: 0,
        percent: 0,
      };
    }
    return deck;
  } catch (err) {
    throw err;
  }
};

const getDeckFull = async (faction, agenda) => {
  try {
    const res = await db.query(
      "SELECT * FROM decks WHERE faction = $1 AND agenda = $2",
      [faction, agenda]
    );
    const deck = res.rows[0];
    if (!deck) {
      await createDeck(faction, agenda);
      return {
        faction: faction,
        agenda: agenda,
        wins: 0,
        losses: 0,
        played: 0,
        percent: 0,
      };
    }
    return deck;
  } catch (err) {
    throw err;
  }
};

const createDeck = async (faction, agenda) => {
  try {
    await db.query(
      "INSERT INTO decks (faction, agenda, wins, losses, played, percent) VALUES ($1, $2, 0, 0, 0, 0)",
      [faction, agenda]
    );
  } catch (err) {
    throw err;
  }
};

const updateDeck = async (deck) => {
  if (!deck.faction) {
    await updateDeckNoFaction(deck);
  } else if (!deck.agenda) {
    await updateDeckNoAgenda(deck);
  } else {
    await updateDeckFull(deck);
  }
};

const updateDeckNoFaction = async (deck) => {
  try {
    await db.query(
      "UPDATE decks SET wins = $2, losses = $3, played = $4, percent = $5 WHERE faction IS NULL AND agenda = $1",
      [deck.agenda, deck.wins, deck.losses, deck.played, deck.percent]
    );
  } catch (err) {
    throw err;
  }
};

const updateDeckNoAgenda = async (deck) => {
  try {
    await db.query(
      "UPDATE decks SET wins = $2, losses = $3, played = $4, percent = $5 WHERE agenda IS NULL AND faction = $1",
      [deck.faction, deck.wins, deck.losses, deck.played, deck.percent]
    );
  } catch (err) {
    throw err;
  }
};

const updateDeckFull = async (deck) => {
  try {
    await db.query(
      "UPDATE decks SET wins = $3, losses = $4, played = $5, percent = $6 WHERE faction = $1 AND agenda = $2",
      [
        deck.faction,
        deck.agenda,
        deck.wins,
        deck.losses,
        deck.played,
        deck.percent,
      ]
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  listDecks: listDecks,
  getDeck: getDeck,
  updateDeck: updateDeck,
};
