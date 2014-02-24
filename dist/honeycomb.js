window.Honeycomb = {};

$.fn.honeyhover = function(options) {
  return $.each(this, function(idx, el) {
    this.honey = new Honeycomb.Hover(el, options);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  window.Honeycomb.__bindable = new Bindable().bindAll();
});

Honeycomb.bind = function(fn, self) {
  return function() {
    fn.apply(self, arguments);
  }
};

Honeycomb.CustomEvent = function(type, options) {
  var event = document.createEvent('Event');
  event.initEvent(type, options.bubbles, options.cancellable);
  return event;
};

Honeycomb.Hover = (function() {

  function Hover(el, options) {
    this.el          = el;
    this.options     = new Honeycomb.Options(this.el, options);

    this.overDelay   = this.options.overDelay;
    this.outDelay    = this.options.outDelay;
    this.sensitivity = this.options.sensitivity;

    this.over = new Honeycomb.HoverOver(this.el, this.options);
    this.out  = new Honeycomb.HoverOut(this.el, this.options);
  };

  Hover.prototype.off = function() {
    this.over.off();
    this.out.off();
  };

  return Hover;
})();

Bindable.register('honey-hover', Honeycomb.Hover);

Honeycomb.HoverOut = (function() {

  function HoverOut(el, options) {
    this.el = el;
    this.options = new Honeycomb.Options(this.el, options);
    this.intent = Honeycomb.bind(this.intent, this);

    $(this.el).on('mouseleave', this.intent);
  };

  HoverOut.prototype.off = function() {
    $(this.el).off('mouseleave', this.intent);
  };

  HoverOut.prototype.intent = function(event) {
    new Honeycomb.OutIntent(event, this.options);
  };

  return HoverOut;
})();

Bindable.register('honey-out', Honeycomb.HoverOut);

Honeycomb.HoverOver = (function() {

  function HoverOver(el, options) {
    this.el = el;
    this.options = new Honeycomb.Options(this.el, options);
    this.intent = Honeycomb.bind(this.intent, this);
    this.event_type = this.options.ignore_bubbles ? 'mouseenter' : 'mouseover';

    $(this.el).on(this.event_type, this.intent);
  };

  HoverOver.prototype.off = function() {
    $(this.el).off(this.event_type, this.intent);
  };

  HoverOver.prototype.intent = function(event) {
    new Honeycomb.OverIntent(event, this.options);
  };

  return HoverOver;
})();

Bindable.register('honey-over', Honeycomb.Over);

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

Honeycomb.Options = (function() {

  function Options(el, options) {
    if (options instanceof Options) {
      return options
    }

    this.el = el;

    if (options === undefined) {
      options = { el: this.el }
    }

    options = $.extend(this.defaults, options);

    this.overDelay = options.overDelay
    this.outDelay = options.outDelay
    this.sensitivity = options.sensitivity
    this.ignore_bubbles = options.ignore_bubbles
  };

  Options.prototype.defaults = {
    sensitivity: 7,
    overDelay: 50,
    outDelay: 0,
    ignore_bubbles: false
  };

  return Options;
})();

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
    this.event.currentTarget.dispatchEvent(this.hoverEvent())
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
