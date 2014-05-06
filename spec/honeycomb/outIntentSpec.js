describe("Honeycomb.OutIntent", function() {

  var mouseleave = function() {
    return new $.Event('mouseleave', {
      target: $('<a></a>')[0],
      currentTarget: $('<a></a>')[0]
    });
  };

  describe("#set", function() {
    it("sets the current timeout", function() {
      var set = spyOn(window, "setTimeout")
      var hover = { outDelay: 100 }
      var out = new Honeycomb.OutIntent({}, hover);

      out.set();

      expect(set).toHaveBeenCalledWith(out.dispatch, hover.outDelay)
    });
  });

  describe("#clear", function() {

    it("removes the current timeout", function() {
      var clear = spyOn(window, "clearTimeout")
      var out = new Honeycomb.OutIntent(mouseleave(), { timeout: 100 });

      out.clear();

      expect(clear).toHaveBeenCalledWith(out.timeout);
    });
  });

  describe("#dispatch", function() {
    beforeEach(function() {
      $('body').append("\
        <li class='hover'><a href='#' id='link'></a></li>\
      ");

      this.$hover = $('.hover');
      this.$hover.honeyhover({ outDelay: 1 });

      jasmine.clock().install()
    });

    afterEach(function() {
      jasmine.clock().uninstall()
      $('.hover').remove();
    });

    it('fires the event on the element listening', function() {
      var out = spyOnEvent('.hover', 'hoverout')

      this.$hover.mouseleave();
      jasmine.clock().tick(1);

      expect(out).toHaveBeenTriggered()
    });

    it('fires only once on the target', function() {
      obj = { callback: function() {} }
      callback = spyOn(obj, 'callback')
      this.$hover.on('hoverout', obj.callback)

      this.$hover.mouseleave()
      jasmine.clock().tick(1);

      expect(callback.calls.count()).toBe(1)
    });

  });

  describe("#hoverEvent", function() {
    beforeEach(function() {
      this.event = $.extend(mouseleave(), {
        pageX: 42,
        pageY: 42
      })

      var intent = new Honeycomb.OutIntent(this.event, {});
      this.hoverEvent = intent.hoverEvent();
    });

    it('returns a hoverout event', function() {
      expect(this.hoverEvent.type).toBe("hoverout");
    });

    it('does not bubble', function() {
      expect(this.hoverEvent.bubbles).toBeFalsy()
    });

    it('sets the pageX and pageY properties', function() {
      expect(this.hoverEvent.pageX).toBe(this.event.pageX);
      expect(this.hoverEvent.pageY).toBe(this.event.pageY);
    });

  });

});
