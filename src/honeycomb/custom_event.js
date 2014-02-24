Honeycomb.CustomEvent = function(type, options) {
  var event = document.createEvent('Event');
  event.initEvent(type, options.bubbles, options.cancellable);
  return event;
};
