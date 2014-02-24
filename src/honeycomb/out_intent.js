Honeycomb.OutIntent = (function() {

  function OutIntent(event, hover) {
    this.event = event;
    this.hover = hover;
    this.timeout = hover.timeout;
    this.dispatch = Honeycomb.bind(this.dispatch, this);

    this.clear(this.timeout);
    this.hover.timeout = this.set();
  };

  OutIntent.prototype.clear = function() {
    clearTimeout(this.timeout);
  };

  OutIntent.prototype.set = function() {
    setTimeout(this.dispatch, this.hover.outDelay);
  };

  OutIntent.prototype.dispatch = function() {
    this.hover.el.dispatchEvent(this.outEvent())
  };

  OutIntent.prototype.outEvent = function() {
    return new CustomEvent('hoverout', {
      bubble: true,
      cancellable: true,
    });
  };

  return OutIntent;

})();
