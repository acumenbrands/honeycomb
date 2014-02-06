Honeycomb.Mouse = (function() {
  var self;

  function Mouse(el, e) {
    self = this;
    this.el = el;
    this.event = e;
    this.x = e.pageX;
    this.y = e.pageY;
  };

  function update(e) {
    self.x = e.pageX;
    self.y = e.pageY;
  };

  Mouse.prototype = {
    track: function() {
      this.el.addEventListener('mousemove', update)
      return this;
    },
    removeTracking: function() {
      this.el.removeEventListener('mousemove', update)
    },
    compare: function(mouse) {
      return Math.sqrt(
        Math.pow(this.x - mouse.x, 2) +
        Math.pow(this.y - mouse.y, 2)
      );
    }
  };

  return Mouse;
})();
