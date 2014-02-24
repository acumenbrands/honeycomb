Honeycomb.Mouse = (function() {
  function Mouse(el, e) {
    this.el = el;
    this.event = e;
    this.x = e.pageX;
    this.y = e.pageY;

    this.update = Honeycomb.bind(this.update, this);
  };

  Mouse.prototype = {
    track: function() {
      this.el.addEventListener('mousemove', this.update)
      return this;
    },
    removeTracking: function() {
      this.el.removeEventListener('mousemove', this.update)
    },
    compare: function(mouse) {
      return Math.sqrt(
        Math.pow(this.x - mouse.x, 2) +
        Math.pow(this.y - mouse.y, 2)
      );
    },
    update: function(e) {
      this.x = e.pageX;
      this.y = e.pageY;
    }
  };

  return Mouse;
})();
