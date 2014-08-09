require.config({
  paths: {
    "jquery": "/bower_components/jquery/dist/jquery"
  },
  baseUrl: '/src/domWidgets'
});
define(['jquery'], function ($) {

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

function defineWidget(depsOrInit, init) {
  var f = function () {
    return {
      init: init || depsOrInit
    };
  };
  if (init) {
    define(deps, f);
  } else {
    define(f);
  }
}
