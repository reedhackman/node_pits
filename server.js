require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port || 4000;
const router = require("./router");

const worker = require("./worker");
worker.start();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Client coming soon");
});
