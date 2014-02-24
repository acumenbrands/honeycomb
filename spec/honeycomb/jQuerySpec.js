describe("$", function() {

  describe("#honeyhover", function() {
    beforeEach(function() {
      $('body').append('<a></a>');
    });

    afterEach(function() {
      $('a').remove()
    });

    it("is defined", function() {
      expect($.fn.honeyhover).toBeDefined();
    });

    it("instantiates a new Honeycomb.Hover", function() {
      var honeySpy = spyOn(Honeycomb, "Hover")
      options = { outDelay: 300 };

      $('a').honeyhover(options);
      var atag = document.querySelector('a')

      expect(honeySpy).toHaveBeenCalledWith(atag, options);
    });

    it("properly passes an HTMLElement to Honeycomb", function() {
      options = { outDelay: 300 };
      var link = $('a').honeyhover(options)[0];

      expect(link.honey.el.constructor.toString()).toMatch(/HTML/)
      expect(link.honey.el.constructor.toString()).toMatch(/Element/)
    });

    it("returns a jQuery object", function() {
      var $link = $('a');

      expect($link.honeyhover()).toBe($link);
    });
  });
});
