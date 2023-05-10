/**
 * Tests for the rock-paper-scissor winner calculator
 *
 */

var expect = require("chai");
const GameHandler = require("../api/gameHandler");

describe("getWinner", function () {
  it("Rock beats scissor", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "bob");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "bob", "rock");
    gameHandler.makeMove("testId", "john", "scissor");
    const game = gameHandler.getGame("testId");

    const result = gameHandler.calculateWinner(game);
    const expectedResult = "bob";

    expect.assert.deepEqual(result.winner, expectedResult);
  });

  it("Scissor beats paper", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "bob");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "bob", "paper");
    gameHandler.makeMove("testId", "john", "scissor");
    const game = gameHandler.getGame("testId");

    const result = gameHandler.calculateWinner(game);
    const expectedResult = "john";

    expect.assert.deepEqual(result.winner, expectedResult);
  });

  it("Paper beats rock", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "bob");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "bob", "paper");
    gameHandler.makeMove("testId", "john", "rock");
    const game = gameHandler.getGame("testId");

    const result = gameHandler.calculateWinner(game);
    const expectedResult = "bob";

    expect.assert.deepEqual(result.winner, expectedResult);
  });

  it("Scissor beats paper reversed action order", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "john");
    gameHandler.addPlayer("testId", "bob");
    gameHandler.makeMove("testId", "john", "scissor");
    gameHandler.makeMove("testId", "bob", "paper");
    const game = gameHandler.getGame("testId");

    const result = gameHandler.calculateWinner(game);
    const expectedResult = "john";

    expect.assert.deepEqual(result.winner, expectedResult);
  });
});
