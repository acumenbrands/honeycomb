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
