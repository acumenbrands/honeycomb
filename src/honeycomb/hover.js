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
