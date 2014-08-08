require.config({
  paths: {
    "jquery": "/lib/jquery"
  },
  baseUrl: './domWidgets'
});
define(['jquery'], function($) {

  $.fn.loadDomWidgets = function () {
    return this.each(function () {
      var $target = $(this);
      if ($target.length === 0) {
        return this;
      }
      var attr = $(this).attr('data-dom-widget');
      var warn = (console && console.warn) || function () {
      };
      $(this).find('[data-dom-widget]').loadDomWidgets();
      if (!attr) {
        return this;
      }
      $.each(attr.split(' '), function () {
        var widgetName = ("" + this).replace(/\./g, '/');
        console.log(widgetName);
        require([widgetName], function (widget) {
          console.log(widget);
          widget.init($target);
        });
      });
    });
  };
  $(document).ready(function () {
    $('body').loadDomWidgets();
  });
  return {};
});
