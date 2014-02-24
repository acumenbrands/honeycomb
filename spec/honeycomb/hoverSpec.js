describe('Honeycomb.Hover', function() {
  function sharedHoverBehaviorFor(context) {
    describe("(shared)", function() {
      var mouseEvent, $hoverzone, hoverzone, hoverFired;

      beforeEach(function() {
        mouseEvent = new $.Event(context.mouseEvent, { pageX: 5, pageY: 5});
        jasmine.clock().install();
        $('body').append("<div id='hoverzone'><a>A hoverable link</a></div>");
        $hoverzone = $('#hoverzone');
        hoverzone = $hoverzone[0];

        context.before();

        $hoverzone.on(context.hoverEvent, function() {
          hoverFired = 'completed';
        });

      });

      afterEach(function() {
        jasmine.clock().uninstall();
        $hoverzone.remove();
        hoverFired = undefined;
      });

      it('fires a callback after the specified hover delay', function() {
        $hoverzone.trigger(mouseEvent);
        $hoverzone.trigger(mouseEvent);
        jasmine.clock().tick(5);

        expect(hoverFired).toBe('completed');
      });

      it('does not fire the callback before the specified delay', function() {
        $hoverzone.trigger(mouseEvent);
        $hoverzone.trigger(mouseEvent);
        jasmine.clock().tick(4);

        expect(hoverFired).toBe(undefined);
      });
    });
  }; // shared functionality for 'onmouseout' and 'onmouseover'

  describe('constructor', function() {
    beforeEach(function() {
      $('body').append("<p id='hoverable'>I am to be hovered</p>");
    });

    afterEach(function() {
      $('#hoverable').remove();
    });

    it('takes an HTMLElement as the first argument', function() {
      var pTag  = document.getElementById('hoverable');
      var hover = new Honeycomb.Hover(pTag);
      expect(hover.el).toBe(pTag);
    });

    describe('onmouseout', function() {
      var context = {
        mouseEvent: 'mouseleave',
        hoverEvent: 'hoverout',
        before: function() {
          new Honeycomb.Hover(hoverzone, { outDelay: 5 });
        }
      };

      sharedHoverBehaviorFor(context);
    }); // onmouseout

    describe('onmouseover', function() {
      var context = {
        mouseEvent: 'mouseover',
        hoverEvent: 'hoverin',
        before: function() {
          new Honeycomb.Hover(hoverzone, { overDelay: 5 });
        }
      };

      sharedHoverBehaviorFor(context);
    }); // onmouseover

  }); // constructor

  describe('#options', function() {
    var a = document.createElement('a');

    it('sets sensitivity', function() {
      var hover = new Honeycomb.Hover(a);
      expect(hover.sensitivity).toBe(Honeycomb.Options.prototype.defaults.sensitivity);
    });

    it('overrides sensitivity', function() {
      var hover = new Honeycomb.Hover(a, { sensitivity: 5 });
      expect(hover.sensitivity).toBe(5);
    });

    it('sets overDelay', function() {
      var hover = new Honeycomb.Hover(a);
      expect(hover.overDelay).toBe(Honeycomb.Options.prototype.defaults.overDelay);
    });

    it('overrides overDelay', function() {
      var hover = new Honeycomb.Hover(a, { overDelay: 120 });
      expect(hover.overDelay).toBe(120);
    });

    it('sets outDelay', function() {
      var hover = new Honeycomb.Hover(a);
      expect(hover.outDelay).toBe(Honeycomb.Options.prototype.defaults.outDelay);
    });

    it('overrides outDelay', function() {
      var hover = new Honeycomb.Hover(a, { outDelay: 100 });
      expect(hover.outDelay).toBe(100);
    });

  }); // #options

  describe('#off', function() {
    var aTag, hover;
    var Testable = {
      callback: function() {
        return "hover was intended";
      }
    };

    beforeEach(function() {
      jasmine.clock().install();
      aTag  = document.createElement('a');
      hover = new Honeycomb.Hover(aTag);

      spyOn(Testable, 'callback');
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('removes the mouseover listener', function() {
      $(aTag).on('hoverin', Testable.callback);
      hover.off();

      $(aTag).trigger('mouseover');

      jasmine.clock().tick(Honeycomb.Options.prototype.defaults.overDelay);

      expect(Testable.callback).not.toHaveBeenCalled();
    });

    it('removes the mouseout listener', function() {
      $(aTag).on('hoverout', Testable.callback);
      hover.off();

      $(aTag).trigger('mouseleave');

      jasmine.clock().tick(Honeycomb.Options.prototype.defaults.outDelay);
      expect(Testable.callback).not.toHaveBeenCalled();
    });

  }); // #off

}); // Honeycomb.Hover
