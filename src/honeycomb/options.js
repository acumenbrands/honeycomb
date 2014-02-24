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
