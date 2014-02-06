describe('Honeycomb.Mouse', function() {

  describe("tracking mouse movement", function() {

    function mouseMove() {
      event = document.createEvent('MouseEvents');

      event.initMouseEvent('mousemove',
        true, true, window, 0, 300, 300, 300, 300, false, false, false, 0, null
      );

      return event;
    };

    beforeEach(function() {
      $('body').append('<a></a>');

      this.link = document.querySelector('a');
      this.mouse = new Honeycomb.Mouse(this.link, {
        pageX: 200, pageY: 200
      });
    });

    afterEach(function() {
      $('a').remove();
    });

    describe('#track', function() {

      it("updates the x and y position", function() {
        this.mouse.track();

        var event = mouseMove();

        this.link.dispatchEvent(event);

        expect(this.mouse.x).toBe(event.pageX);
        expect(this.mouse.y).toBe(event.pageY);
      });
    }); // #track

    describe("#removeTracking", function() {

      it("stops tracking the user's mouse movements", function() {
        var originalMovement = { x: this.mouse.x, y: this.mouse.y }
        this.mouse.track();
        this.mouse.removeTracking();

        var event = mouseMove();

        this.link.dispatchEvent(event);

        expect(this.mouse.x).toBe(originalMovement.x);
        expect(this.mouse.y).toBe(originalMovement.y);
      });
    }); // #removeTracking

  }); // tracking

}); // # Honeycomb.Mouse
