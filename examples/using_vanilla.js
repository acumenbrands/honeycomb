document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.nested-link'),
      nav = document.querySelector('.nested-link');

  new Honeycomb.HoverOver(nav);

  for (var i=0; i < links.length; i++) {
    new Honeycomb.HoverOut(links[i]);

    links[i].addEventListener('hoverin', function() {
      this.className += ' hovered';
    });

    links[i].addEventListener('hoverout', function() {
      this.className = this.className.replace(/(\shovered)/, '');
    });

  }

});
