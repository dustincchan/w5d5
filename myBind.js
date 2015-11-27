Function.prototype.myBind = function(context) {
  var fn = this;
  return function () {
    fn.apply(context);
  };
};
