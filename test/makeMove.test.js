/**
 * Tests for the rock-paper-scissor api makeMove method
 *
 */

var expect = require("chai");
const GameHandler = require("../api/gameHandler");

describe("makeMove", function () {
  it("Should return error if trying to move player which is not in game", function () {
    const gameHandler = new GameHandler();

    gameHandler.createGame("testId", "bob");
    gameHandler.addPlayer("testId", "john");
    try {
      gameHandler.makeMove("testId", "bobz", "rock");
    } catch (ex) {
      expect.assert.equal(ex.toString(), "Error: Player is not in game");
    }
  });
  it("Should make move if circumstances are correct", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "bob");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "bob", "rock");

    const result = gameHandler.getGame("testId");
    const expectedResult = {
      id: "testId",
      players: [
        {
          name: "bob",
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
    gameHandler.createGame("testId", "bob");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "bob", "rock");
    gameHandler.makeMove("testId", "john", "scissor");

    const result = gameHandler.getGame("testId");
    const expectedResult = {
      id: "testId",
      players: [
        {
          name: "bob",
          move: "rock",
        },
        {
          name: "john",
          move: "scissor",
        },
      ],
      winner: "bob",
    };

    expect.assert.deepEqual(result, expectedResult);
  });

  it("Should not be able to make move if game is finished", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "bob");
    gameHandler.addPlayer("testId", "john");
    gameHandler.makeMove("testId", "bob", "rock");
    gameHandler.makeMove("testId", "john", "scissor");
    try {
      gameHandler.makeMove("testId", "john", "paper");
    } catch (ex) {
      expect.assert.deepEqual(ex.toString(), "Error: Game is already finished");
    }
  });
});
