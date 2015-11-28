var board = require("./board.js");

function TicTacToe (reader) {
  this.reader = reader;
  this.symbol = "x";
  this.winner = null;
}

TicTacToe.prototype.run = function (completionCallback) {
  var game = this;
  this.promptMove(function (space, symbol) {
    if (game.move(space, symbol)) {
      if (game.over()) {
        console.log("Game Over");
        //log winning player//
      } else {
        game.run(completionCallback);
      }
    } else {
      console.log("Invalid move! Try again.");
    }
  });
};

Array.prototype.allValuesSame = function() {
    for(var i = 1; i < this.length; i++)
    {
        if(this[i] !== this[0])
            return false;
    }
    return true;
};

TicTacToe.prototype.checkColumns = function () {
  for (var col = 0; col < 3; col++) {
    var tempCol = [board.grid[0][col],
                  board.grid[1][col],
                  board.grid[2][col]];

    if (tempCol.allValuesSame()){
      this.winner = tempCol[0];
      return true;
    }
  }
  return false;
};

TicTacToe.prototype.checkDiag = function () {
  var diag1 = [board.grid[0][0],
              board.grid[1][1],
              board.grid[2][2]];

  var diag2 = [board.grid[0][2],
              board.grid[1][1],
              board.grid[2][0]];
  if (diag1.allValuesSame() || diag2.allValuesSame()) {
    this.winner = board.grid[1][1];
    return true;
  }
  return false;
};

TicTacToe.prototype.checkRows = function () {
  for (var row = 0; row < 3; row++) {
    if (row.allValuesSame()) {
      this.winner = row[0];
      return true;
    }
  }
  return false;
};


TicTacToe.prototype.checkForWinner = function () {
//   if (this.checkRows()) {
//     return true;
//   } else if (this.check)
};

TicTacToe.prototype.boardFull = function () {
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      if (board.grid[row][col] === null) {
        return false;
      }
    }
  }
  return true;
};

TicTacToe.prototype.gameOver = function () {

  return this.boardFull();
};

TicTacToe.prototype.swapSymbol = function () {
  if (this.symbol === "x") {
    this.symbol = "o";
  } else if (this.symbol === "o"){
    this.symbol = "x";
  }
};

TicTacToe.prototype.move = function (row, col) {
  if (board.grid[row][col]) {
    return false;
  } else {
    board.grid[row][col] = this.symbol;
    this.swapSymbol();
  }
};

TicTacToe.prototype.print = function () {
  for (var i = 0; i < board.grid.length; i++) {
    console.log(board.grid[i]);
  }
};

TicTacToe.prototype.promptMove = function (callback) {
  this.print();

  this.reader.question("Row: ", function (row) {
    this.reader.question("Column: ", function (col) {
      callback(parseInt(row), parseInt(col));
      // return this.move(parseInt(fromTower), parseInt(toTower));
    });
  });
};
