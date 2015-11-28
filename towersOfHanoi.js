var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame () {
  this.stacks = [[3, 2, 1], [], []];
}

HanoiGame.prototype.isWon = function () {
  if (this.stacks[0].length === 0) {
    if (this.stacks[1].length === 0 || this.stacks[2].length === 0) {
      return true;
    }
  }
  return false;
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  var startTower = this.stacks[startTowerIdx];
  var endTower = this.stacks[endTowerIdx];

  // source tower is empty
  if (startTower.length === 0) {
    return false;
  }

  var startDisc = startTower[startTower.length - 1];

  // end tower is empty
  if (endTower.length === 0) {
    return true;
  // end tower disc larger than source disc
  } else if (endTower[endTower.length - 1] > startDisc) {
    return true;
  // end tower disc smaller than source disc
  } else {
    return false;
  }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function () {
  console.log("0: " + this.stacks[0]);
  console.log("1: " + this.stacks[1]);
  console.log("2: " + this.stacks[2]);
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();

  reader.question("From tower: ", function (fromTower) {
    reader.question("To tower: ", function (toTower) {
      callback(parseInt(fromTower), parseInt(toTower));
      // return this.move(parseInt(fromTower), parseInt(toTower));
    });
  });
};

HanoiGame.prototype.run = function (completionCallback) {
  // if (this.promptMove(this.move)) {
  var game = this;
  this.promptMove(function (fromTower, toTower) {
    if (game.move(fromTower, toTower)) {
      if (game.isWon()) {
        console.log("YOU WON");
        completionCallback();
      } else {
        game.run(completionCallback);
      }
    } else {
      console.log("Invalid move! Try again.");
    }
  });
};

var hanoi = new HanoiGame();
hanoi.run(function () {
  reader.close();
});
