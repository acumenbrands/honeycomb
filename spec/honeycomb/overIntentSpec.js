describe("Honeycomb.OverIntent", function() {

  var mouseover = function() {
    return new $.Event('mouseover', {
      target: $('<a></a>')[0],
      currentTarget: $('<a></a>')[0]
    });
  };

  describe("#hoverEvent", function() {
    beforeEach(function() {
      this.event = $.extend(mouseover(), {
        pageX: 42,
        pageY: 42
      })

      var element = document.createElement('a');

      var intent = new Honeycomb.OverIntent(this.event, { el: element });
      this.overIntent = intent.hoverEvent();
    });

    it('returns a hoverin event', function() {
      expect(this.overIntent.type).toBe("hoverin");
    });

    it('bubbles', function() {
      expect(this.overIntent.bubbles).toBeTruthy()
    });

    it('sets the pageX and pageY properties', function() {
      expect(this.overIntent.pageX).toBe(this.event.pageX);
      expect(this.overIntent.pageY).toBe(this.event.pageY);
    });

  });

});
