Honeycomb.OverIntent = (function() {

  function OverIntent(event, hover) {
    this.el = hover.el;
    this.event = event;
    this.hover = hover;

    this.originalPosition = new Honeycomb.Mouse(this.el, event);
    this.trackedPosition  = new Honeycomb.Mouse(this.el, event).track();

    this._attempt = Honeycomb.bind(this._attempt, this);

    this._setIntentionDelay();
  };

  OverIntent.prototype.set = function() {
    this.hover.timeout = setTimeout(this._attempt, this.hover.overDelay);
  };

  OverIntent.prototype.clear = function() {
    clearTimeout(this.hover.timeout);
  };

  OverIntent.prototype._setIntentionDelay = function() {
    this.clear();
    this.set();
  };

  OverIntent.prototype.mouseMovement = function() {
    return this.originalPosition.compare(this.trackedPosition);
  };

  OverIntent.prototype.hoverEvent = function() {
    var hover = new Honeycomb.CustomEvent('hoverin', {
      bubbles: true,
      cancellable: true
    });

    hover.pageX = this.trackedPosition.x
    hover.pageY = this.trackedPosition.y

    return hover;
  };

  OverIntent.prototype._attempt = function() {
    if (this.hover.sensitivity > this.mouseMovement()) {
      this._success()
      this.trackedPosition.removeTracking();
    } else {
      this._failure()
    }
  };

  OverIntent.prototype._success = function() {
    this.event.target.dispatchEvent(this.hoverEvent());
  };

  OverIntent.prototype._failure = function() {
    this.originalPosition.update({
      pageX: this.trackedPosition.x,
      pageY: this.trackedPosition.y
    });

    this._setIntentionDelay();
  };

  return OverIntent;

})();
