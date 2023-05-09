/**
 * Basic tests for the rock-paper-scissor api gamehandler
 *
 */

var expect = require("chai");
const GameHandler = require("../api/gameHandler");

describe("getGameTest", function () {
  it("Should return error if trying to get game which doesnt exist", function () {
    const gameHandler = new GameHandler();

    gameHandler.createGame("testId", "marko");

    try {
      const result = gameHandler.getGame("testId2");
    } catch (ex) {
      expect.assert.equal(ex.toString(), "Error: Game not found");
    }
  });
  it("Should return game if it exists", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "marko");
    const result = gameHandler.getGame("testId");
    const expectedResult = {
      id: "testId",
      players: [
        {
          name: "marko",
          move: null,
        },
      ],
    };
    expect.assert.deepEqual(result, expectedResult);
  });
});

describe("addPlayerTest", function () {
  it("Should return error if trying to join game which doesnt exist", function () {
    const gameHandler = new GameHandler();

    gameHandler.createGame("testId", "marko");

    try {
      const result = gameHandler.addPlayer("testId2");
    } catch (ex) {
      expect.assert.equal(ex.toString(), "Error: Game not found");
    }
  });
  it("Should join game if it exists", function () {
    const gameHandler = new GameHandler();
    gameHandler.createGame("testId", "marko");
    gameHandler.addPlayer("testId", "john");
    const result = gameHandler.getGame("testId");
    const expectedResult = {
      id: "testId",
      players: [
        {
          name: "marko",
          move: null,
        },
        {
          name: "john",
          move: null,
        },
      ],
    };
    expect.assert.deepEqual(result, expectedResult);
  });
});
