window.Honeycomb = {};

$.fn.honeyhover = function(options) {
  return $.each(this, function(idx, el) {
    this.honey = new Honeycomb.Hover(el, options);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  window.Honeycomb.__bindable = new Bindable().bindAll();
});
