Honeycomb.OutIntent = (function() {

  function OutIntent(event, hover) {
    this.event = event;
    this.hover = hover;
    this.timeout = hover.timeout;
    this.dispatch = Honeycomb.bind(this.dispatch, this);

    this.clear(this.timeout);
    this.hover.timeout = this.set();
  };

  OutIntent.prototype.set = function() {
    setTimeout(this.dispatch, this.hover.outDelay);
  };

  OutIntent.prototype.clear = function() {
    clearTimeout(this.timeout);
  };

  OutIntent.prototype.dispatch = function() {
    this.event.target.dispatchEvent(this.hoverEvent());
  };

  OutIntent.prototype.hoverEvent = function() {
    var hoverout = new Honeycomb.CustomEvent('hoverout', {
      bubbles: false,
      cancellable: true,
    });

    hoverout.pageX = this.event.pageX;
    hoverout.pageY = this.event.pageY;

    return hoverout;
  };

  return OutIntent;

})();
