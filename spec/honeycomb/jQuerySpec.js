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
      var honey = $('a').honeyhover(options)[0];

      expect(honey.el.constructor.toString()).toMatch(/HTML/)
      expect(honey.el.constructor.toString()).toMatch(/Element/)
    });
  });
});
