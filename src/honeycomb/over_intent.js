Honeycomb.OverIntent = (function() {

  function OverIntent(event, hover) {
    this.el = hover.el;
    this.event = event;
    this.hover = hover;

    this.originalPosition = new Honeycomb.Mouse(this.el, event);
    this.trackedPosition  = new Honeycomb.Mouse(this.el, event).track();

    this._attempt = Honeycomb.bind(this._attempt, this);

    this._setIntentionDelay();
    this.trackedPosition.removeTracking();
  };

  OverIntent.prototype._setIntentionDelay = function() {
    clearTimeout(this.hover.timeout);
    this.hover.timeout = setTimeout(this._attempt, this.hover.overDelay);
  };

  OverIntent.prototype.mouseMovement = function() {
    return this.originalPosition.compare(this.trackedPosition);
  };

  OverIntent.prototype.hoverEvent = function() {
    return new CustomEvent('hoverin', {
      bubble: true,
      cancellable: true,
      pageX: this.trackedPosition.x,
      pageY: this.trackedPosition.y
    });
  };

  OverIntent.prototype._attempt = function() {
    if (this.hover.sensitivity > this.mouseMovement()) {
      this._success()
    } else {
      this._failure()
    }
  };

  OverIntent.prototype._success = function() {
    this.hover.el.dispatchEvent(this.hoverEvent());
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
