$.fn.extend({
  confirmBeforeExit: function () {
    $(this).on('click', 'a', function () {
      if ($(this).attr('href').indexOf('http://') === 0 || $(this).attr('href').indexOf('https://') === 0) {
        return confirm('Are you sure you want to leave?');
      }
    });
  },
  blink: function () {
    return this.each(function () {
      var $elem = $(this);
      var delay = parseInt($elem.attr('data-delay') || 1000, 10);
      setInterval(function () {
        $elem.css('visibility', $elem.css('visibility') === 'hidden' ? 'visible' : 'hidden');
      }, delay);
    });
  }
});
