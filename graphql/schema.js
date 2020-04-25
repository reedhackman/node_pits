const { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Player {
    id: Int!
    name: String!
    wins: Int!
    losses: Int!
    rating: Float!
    percent: Float!
    played: Int!
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
    players: [Player]
    player(id: Int!): Player
    decks: [Deck]
    deck(faction: String, agenda: String!): Deck
  }
`);

module.exports = { schema };
