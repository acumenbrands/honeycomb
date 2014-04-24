Honeycomb.Mouse = (function() {

  function Mouse(el, e) {
    this.el = el;
    this.event = e;
    this.x = e.pageX;
    this.y = e.pageY;

    this.update = Honeycomb.bind(this.update, this);
  };

  Mouse.prototype.track = function() {
    $(this.el).on('mousemove', this.update);
    return this;
  };

  Mouse.prototype.removeTracking = function() {
    $(this.el).off('mousemove', this.update);
  };

  Mouse.prototype.compare = function(mouse) {
    return Math.sqrt(
      Math.pow(this.x - mouse.x, 2) +
      Math.pow(this.y - mouse.y, 2)
    );
  };

  Mouse.prototype.update = function(e) {
    this.x = e.pageX;
    this.y = e.pageY;
  };

  return Mouse;
})();
