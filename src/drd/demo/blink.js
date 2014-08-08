define([], function () {
  return {
    init: function ($elem) {
      setInterval(function () {
        $elem.css('visibility', $elem.css('visibility') === 'visible' ? 'hidden' : 'visible');
      }, $elem.data('delay') || 500);
    }
  }
});
