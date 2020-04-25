require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port || 4000;
const graphqlHTTP = require("express-graphql");
const { schema } = require("./graphql/schema");
const { root } = require("./graphql/root");

const worker = require("./worker");
worker.start();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Listening on port ${port}`));
