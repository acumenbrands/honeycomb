Honeycomb.bind = function(fn, self) {
  return function() {
    fn.apply(self, arguments);
  }
};
