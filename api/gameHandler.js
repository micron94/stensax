const NodeCache = require("node-cache");
const validMoves = ["rock", "paper", "scissor"];

const GameHandler = function () {
  const gameCache = new NodeCache();

  GameHandler.prototype.makeMove = (gameId, player, move) => {
    let game = this.getGame(gameId);
    if (game.winner) throw Error("Game is already finished");
    if (game.players.length < 2) {
      throw new Error("Missing second player");
    }
    if (!game.players.find((play) => player === play.name))
      throw new Error("Player is not in game");
    if (playerMoveIsNull(game, player)) {
      throw new Error("Player already made move");
    }
    if (validMoves.includes(move)) {
      const objIndex = game.players.findIndex(
        (gamePlayer) => gamePlayer.name === player
      );
      game.players[objIndex].move = move;
      this.updateGame(game);
    }
  };

  const playerMoveIsNull = (game, player) => {
    const play = game.players.find((gamePlayer) => player === gamePlayer.name);
    if (!play.move) {
      return false;
    } else return true;
  };

  GameHandler.prototype.addPlayer = (gameId, player) => {
    let game = this.getGame(gameId);
    if (game.winner) throw Error("Game is already finished");
    if (game.players.length === 1) {
      game.players.push({ name: player, move: null });
      this.updateGame(game);
    } else throw new Error("Game is already full!");
  };

  GameHandler.prototype.updateGame = (updatedGame) => {
    gameCache.del(updatedGame.id);
    const result = gameCache.set(updatedGame.id, updatedGame, 10000);
    if (!result) throw new Error("Failed to update cache!");
  };

  GameHandler.prototype.createGame = (gameId, name) => {
    const game = {
      id: gameId,
      players: [
        {
          name: name,
          move: null,
        },
      ],
    };
    gameCache.set(gameId, game, 10000);
  };

  GameHandler.prototype.getGame = (gameId) => {
    const game = gameCache.get(gameId);

    if (game) {
      if (game.players[0].move && game.players[1].move) {
        return this.calculateWinner(game);
      }
      return game;
    } else throw new Error("Game not found");
  };

  GameHandler.prototype.calculateWinner = (game) => {
    if (game.players[0].move === game.players[1].move) return "draw";
    const playerOneMove = validMoves.indexOf(game.players[0].move);
    const playerTwoMove = validMoves.indexOf(game.players[1].move);
    if (
      mod(playerOneMove - playerTwoMove, validMoves.length) <
      validMoves.length / 2
    ) {
      game.winner = game.players[0].name;
    } else {
      game.winner = game.players[1].name;
    }
    this.updateGame(game);
    return game;
  };

  const mod = (a, b) => {
    c = a % b;
    return c < 0 ? c + b : c;
  };
};

module.exports = GameHandler;
