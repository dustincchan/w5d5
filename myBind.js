Function.prototype.myBind = function(context) {
  var fn = this;
  return function () {
    return fn.apply(context);
  };
};
