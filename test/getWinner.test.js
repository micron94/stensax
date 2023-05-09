/**
 * Tests for the rock-paper-scissor winner calculator
 *
 */

var expect = require("chai");
const GameHandler = require("../api/gameHandler");

describe("getWinner", function () {
  it("Rock beats scissor", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "marko");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "marko", "rock");
    gameHandler.makeMove("testId", "john", "scissor");
    const game = gameHandler.getGame("testId");

    const result = gameHandler.calculateWinner(game);
    const expectedResult = "marko wins";

    expect.assert.deepEqual(result, expectedResult);
  });

  it("Scissor beats paper", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "marko");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "marko", "paper");
    gameHandler.makeMove("testId", "john", "scissor");
    const game = gameHandler.getGame("testId");

    const result = gameHandler.calculateWinner(game);
    const expectedResult = "john wins";

    expect.assert.deepEqual(result, expectedResult);
  });

  it("Paper beats rock", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "marko");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "marko", "paper");
    gameHandler.makeMove("testId", "john", "rock");
    const game = gameHandler.getGame("testId");

    const result = gameHandler.calculateWinner(game);
    const expectedResult = "marko wins";

    expect.assert.deepEqual(result, expectedResult);
  });

  it("Scissor beats paper reversed action order", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "john");
    gameHandler.addPlayer("testId", "marko");
    gameHandler.makeMove("testId", "john", "scissor");
    gameHandler.makeMove("testId", "marko", "paper");
    const game = gameHandler.getGame("testId");

    const result = gameHandler.calculateWinner(game);
    const expectedResult = "john wins";

    expect.assert.deepEqual(result, expectedResult);
  });
});
