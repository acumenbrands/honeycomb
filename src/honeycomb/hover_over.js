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
