const { buildSchema } = require("graphql");

var schema = buildSchema(`
  scalar Date

  type Game {
    winner_id: Int!
    winner_name: String
    loser_id: Int!
    loser_name: String
    tournament_id: Int
    tournament_date: Date!
    winner_faction: String
    loser_faction: String
    winner_agenda: String
    loser_agenda: String
  }

  type Player {
    id: Int!
    name: String!
    wins: Int!
    losses: Int!
    rating: Float!
    percent: Float!
    played: Int!
    games: [Game]
  }

  type Deck {
    faction: String
    agenda: String!
    wins: Int!
    losses: Int!
    played: Int!
    percent: Float!
  }

  type Query {
    games: [Game]
    players: [Player]
    playerTable(page: Int!, perPage: Int!, sort: String!, sortDirection: String!): [Player]
    player(id: Int!): Player
    numPlayers: Int
    decks: [Deck]
    deck(faction: String, agenda: String!): Deck
  }
`);

module.exports = { schema };
