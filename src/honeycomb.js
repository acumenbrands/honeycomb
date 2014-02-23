window.Honeycomb = {};

if (jQuery !== undefined && window.jQuery === window.$) {
  $.fn.honeyhover = function(options) {
    return $.map(this, function(el, idx) {
      return new Honeycomb.Hover(el, options);
    });
  };
}
