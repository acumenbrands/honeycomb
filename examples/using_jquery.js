$(function() {

  // ========= Using jQuery plugin ============
  $nestable = $('#nestable');

  $nestable.honeyhover({
    overDelay: 30,
    outDelay: 50,
    sensitivity: 2,
  });

  $nestable.on("hoverin", function() {
    $('.nested-nav').slideDown()
  });

  $nestable.on("hoverout", function() {
    $('.nested-nav').slideUp()
  });

  // ========= Using data attributes ============

  $('[data-bindable="honey-hover"]').on('hoverin', function(e) {
    $(e.target).addClass('hovered');
  });

  $('[data-bindable="honey-hover"]').on('hoverout', function(e) {
    $(e.target).removeClass('hovered');
  });

});
