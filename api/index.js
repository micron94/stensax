const express = require("express");
const bodyParser = require("body-parser");

const { v4: uuidv4, v4 } = require("uuid");
const NodeCache = require("node-cache");
const GameHandler = require("./gameHandler");
const app = express();
app.use(bodyParser.json());
const gameHandler = new GameHandler();

const PORT = 3001;
app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  } else console.log("Error occurred, server can't start", error);
});

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.get("/game/:id", (req, res) => {
  const result = gameHandler.getGame(req.params.id);
  if (result) {
    res.status(200);
    res.send(result);
  } else {
    res.status(404);
    res.send("game not found");
  }
});

app.post("/game", (req, res) => {
  const gameId = v4();
  console.log(req.body);
  try {
    gameHandler.createGame(gameId, req.body.name);
  } catch (ex) {
    return res.send(ex.toString());
  }
  res.status(200);
  return res.send(
    `Welcome to a new game of rock paper scissors! Your game-id is: ${gameId}`
  );
});

app.put(`/game/:id/join`, (req, res) => {
  const playerName = req.body.name;
  try {
    gameHandler.addPlayer(req.params.id, req.body.name);
  } catch (ex) {
    res.send(ex.toString());
  }
  res.status(200);
  res.send(
    `You have added player ${playerName}! Your game-id is: ${req.params.id}`
  );
});

app.put(`/game/move/:id`, (req, res) => {
  const playerName = req.body.name;
  const move = req.body.move;
  try {
    gameHandler.makeMove(req.params.id, req.body.name, move);
  } catch (ex) {
    res.status(400);
    return res.send(ex.toString());
  }
  res.status(200);
  res.send(
    `You have added player ${playerName}! Your game-id is: ${req.params.id}`
  );
});
