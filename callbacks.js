Function.prototype.myBind = function(context) {
  var fn = this;
  return function () {
    fn.apply(context);
  };
};


function Clock () {
  var date = new Date();
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
  this.seconds = date.getSeconds();
  this.printTime();
  setInterval(this._tick.myBind(this), 1000);
}

Clock.prototype.printTime = function () {
  var time = this.hours + ":" + this.minutes + ":" + this.seconds;
  console.log(time);
};

Clock.prototype._tick = function () {

this.seconds += 1;
this.printTime();
};

var clock = new Clock();

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Enter #", function (numberInput) {

      var num = parseInt(numberInput);

      var newSum = sum + num;
      console.log(newSum);

      addNumbers(newSum, numsLeft - 1, completionCallback);
    });
  }
}

// addNumbers(0, 3, function (sum) {
//   console.log("Total Sum: " + sum);
// });
//
// cat.meow() // this => cat
// setInterval(cat.meow.bind(cat), 1000)
// // this => window
//
// // apply(ctx, [args])
// // call(ctx, listed, args, needs, to, be, exact)
//
// setInterval(function(fn){
//   fn.apply(ctx);
// }, 1000)
//
// Cat.prototype.meow = function () {
//   console.log('hello ' + this.name);
// };
