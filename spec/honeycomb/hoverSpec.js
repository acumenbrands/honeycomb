
describe('Honeycomb.Hover', function() {
  function sharedHoverBehaviorFor(context) {
    describe("(shared)", function() {
      var MouseOver, hoverzone, hoverFired;

      beforeEach(function() {
        MouseOver = context.MouseEvent
        jasmine.clock().install();
        $('body').append("<div id='hoverzone'><a>A hoverable link</a></div>");
        hoverzone = document.getElementById('hoverzone');

        context.before();

        $(hoverzone).on(context.event, function() {
          hoverFired = 'completed';
        });

      });

      afterEach(function() {
        jasmine.clock().uninstall();
        $(hoverzone).remove();
        hoverFired = undefined;
      });

      it('fires a callback after the specified hover delay', function() {
        hoverzone.dispatchEvent(MouseOver);
        hoverzone.dispatchEvent(MouseOver);
        jasmine.clock().tick(5);

        expect(hoverFired).toBe('completed');
      });

      it('does not fire the callback before the specified delay', function() {
        hoverzone.dispatchEvent(MouseOver);
        hoverzone.dispatchEvent(MouseOver);
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
      var context = {};

      beforeEach(function() {
        context.MouseEvent = document.createEvent('MouseEvents');
        context.MouseEvent.initMouseEvent('mouseout');
        context.event = 'hoverout'

        context.before = function() {
          new Honeycomb.Hover(hoverzone, {
            outDelay: 5
          });
        }
      });

      sharedHoverBehaviorFor(context);
    }); // onmouseout

    describe('onmouseover', function() {
      var context = {};

      beforeEach(function() {
        context.MouseEvent = document.createEvent('MouseEvents');
        context.MouseEvent.initMouseEvent('mouseover');
        context.event = 'hoverin';

        context.before = function() {
          new Honeycomb.Hover(hoverzone, {
            overDelay: 5
          });
        }
      });

      sharedHoverBehaviorFor(context);
    }); // onmouseover

  }); // constructor

  describe('#defaults', function() {
    var a = document.createElement('a');

    it('sets sensitivity', function() {
      var hover = new Honeycomb.Hover(a);
      expect(hover.sensitivity).toBe(Honeycomb.Hover.prototype.defaults.sensitivity);
    });

    it('overrides sensitivity', function() {
      var hover = new Honeycomb.Hover(a, { sensitivity: 5 });
      expect(hover.sensitivity).toBe(5);
    });

    it('sets overDelay', function() {
      var hover = new Honeycomb.Hover(a);
      expect(hover.overDelay).toBe(Honeycomb.Hover.prototype.defaults.overDelay);
    });

    it('overrides overDelay', function() {
      var hover = new Honeycomb.Hover(a, { overDelay: 120 });
      expect(hover.overDelay).toBe(120);
    });

    it('sets outDelay', function() {
      var hover = new Honeycomb.Hover(a);
      expect(hover.outDelay).toBe(Honeycomb.Hover.prototype.defaults.outDelay);
    });

    it('overrides outDelay', function() {
      var hover = new Honeycomb.Hover(a, { outDelay: 100 });
      expect(hover.outDelay).toBe(100);
    });

    it('sets timeout', function() {
      var hover = new Honeycomb.Hover(a);
      expect(hover.timeout).toBe(null);
    });

    it('does not override timeout', function() {
      var hover = new Honeycomb.Hover(a, { timeout: 1 });
      expect(hover.timeout).toBe(null);
    });

  }); // #defaults

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

      var event = document.createEvent('MouseEvents')
      event.initMouseEvent('mouseover');

      aTag.dispatchEvent(event);

      jasmine.clock().tick(Honeycomb.Hover.prototype.defaults.overDelay);

      expect(Testable.callback).not.toHaveBeenCalled();
    });

    it('removes the mouseout listener', function() {
      $(aTag).on('hoverout', Testable.callback);
      hover.off();

      var event = document.createEvent('MouseEvents')
      event.initMouseEvent('mouseout');

      aTag.dispatchEvent(event);

      jasmine.clock().tick(Honeycomb.Hover.prototype.defaults.outDelay);
      expect(Testable.callback).not.toHaveBeenCalled();
    });

  }); // #off

}); // Honeycomb.Hover
