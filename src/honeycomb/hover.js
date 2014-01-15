Honeycomb.Hover = (function() {
  var self, outIntent, overIntent;

  function Hover(el, options) {
    self = this;

    if (options === undefined) {
      options = {};
    }

    this.el          = el;
    this.timeout     = null;
    this.overDelay   = options.overDelay   || this.defaults.overDelay;
    this.outDelay    = options.outDelay    || this.defaults.outDelay;
    this.sensitivity = options.sensitivity || this.defaults.sensitivity;

    this.el.addEventListener('mouseover', overIntent);
    this.el.addEventListener('mouseout', outIntent);
  }

  Hover.prototype.defaults = {
    sensitivity: 7,
    overDelay: 100,
    outDelay: 0,
  };

  Hover.prototype.off = function() {
    this.el.removeEventListener('mouseover', overIntent);
    this.el.removeEventListener('mouseout', outIntent);
  };

  outIntent = function(e) {
    clearTimeout(self.timeout);

    self.timeout = setTimeout(function() {
      var hoverEvent = new CustomEvent('hoverout', { bubble: true, cancellable: true })
      self.el.dispatchEvent(hoverEvent)
    }, self.outDelay);
  };

  overIntent = function(e) {
    var originalOverPosition = new Honeycomb.Mouse(self.el, e),
        trackedPosition      = new Honeycomb.Mouse(self.el, e).track(),
        _attempt, _setIntentionDelay;

    _attempt = function() {
      var mouseMovement = originalOverPosition.compare(trackedPosition), hoverEvent;

      if (self.sensitivity > mouseMovement) {
        hoverEvent = new CustomEvent('hoverin', { bubble: true, cancellable: true })
        self.el.dispatchEvent(hoverEvent)
      } else {
        originalOverPosition.x = trackedPosition.x
        originalOverPosition.y = trackedPosition.y

        _setIntentionDelay();
      }
    }
    _setIntentionDelay = function() {
      clearTimeout(self.timeout);
      self.timeout = setTimeout(_attempt, self.overDelay);
    }

    _setIntentionDelay();
    trackedPosition.removeTracking();
  };

  return Hover;
}());


// because phantomjs doesn't have CustomEvent defined for some reason
if (window.CustomEvent === undefined) {
  window.CustomEvent = function(type, options) {
    var event = document.createEvent('Event');
    event.initEvent(type, options.bubble, options.cancellable)
    return event;
  };
};

