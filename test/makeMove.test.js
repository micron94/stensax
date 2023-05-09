/**
 * Tests for the rock-paper-scissor api makeMove method
 *
 */

var expect = require("chai");
const GameHandler = require("../api/gameHandler");

describe("makeMove", function () {
  it("Should return error if trying to move player which is not in game", function () {
    const gameHandler = new GameHandler();

    gameHandler.createGame("testId", "marko");
    gameHandler.addPlayer("testId", "john");
    try {
      gameHandler.makeMove("testId", "markoz", "rock");
    } catch (ex) {
      expect.assert.equal(ex.toString(), "Error: Player is not in game");
    }
  });
  it("Should make move if circumstances are correct", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "marko");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "marko", "rock");

    const result = gameHandler.getGame("testId");
    const expectedResult = {
      id: "testId",
      players: [
        {
          name: "marko",
          move: "rock",
        },
        {
          name: "john",
          move: null,
        },
      ],
    };

    expect.assert.deepEqual(result, expectedResult);
  });

  it("Should make move for second player if circumstances are correct", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "marko");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "marko", "rock");
    gameHandler.makeMove("testId", "john", "scissor");

    const result = gameHandler.getGame("testId");
    const expectedResult = {
      id: "testId",
      players: [
        {
          name: "marko",
          move: "rock",
        },
        {
          name: "john",
          move: "scissor",
        },
      ],
    };

    expect.assert.deepEqual(result, expectedResult);
  });
});
