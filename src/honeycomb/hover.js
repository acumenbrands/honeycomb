Honeycomb.Hover = (function() {

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

    this.overIntent = Honeycomb.bind(this.overIntent, this);
    this.outIntent  = Honeycomb.bind(this.outIntent, this);

    this.el.addEventListener('mouseover', this.overIntent);
    this.el.addEventListener('mouseout', this.outIntent);
  }

  Hover.prototype.defaults = {
    sensitivity: 7,
    overDelay: 100,
    outDelay: 0,
  };

  Hover.prototype.off = function(event) {
    this.el.removeEventListener('mouseover', this.overIntent);
    this.el.removeEventListener('mouseout', this.outIntent);
  };

  Hover.prototype.overIntent = function(event) {
    new Honeycomb.OverIntent(event, this);
  };

  Hover.prototype.outIntent = function(event) {
    new Honeycomb.OutIntent(event, this);
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

