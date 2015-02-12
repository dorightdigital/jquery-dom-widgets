/*global jQuery, console*/

function jqueryDomWidgetManager() {
  'use strict';
  var widgetContainer = {},
    attrName = 'data-dom-widget',
    attrPrettyName = 'domWidget',
    warn = function () {
      if (console && console.warn) {
        console.warn.apply(console, arguments);
      }
    };

  function setup($elems) {
    $elems.each(function () {
      var $elem = jQuery(this),
        attrValue = $elem.attr(attrName);
      if (attrValue) {
        jQuery.each(attrValue.split(' '), function () {
          var name = String(this), data;
          if (widgetContainer.hasOwnProperty(name)) {
            data = $elem.data();
            delete data[attrPrettyName];
            widgetContainer[name]($elem, data);
          } else {
            warn('no plugin found nonExistentPlugin');
          }
        });
      }
    });
  }

  return {
    addDomWidget: function (name, fn) {
      widgetContainer[name] = fn;
    },
    loader: function () {
      if (!(this instanceof jQuery)) {
        throw 'Can\'t load Dom Widgets outside of jQuery scope';
      }
      setup(this);
      setup(this.find('[' + attrName + ']'));
      return this;
    }
  };
}

(function ($) {
  'use strict';
  var dwManager = jqueryDomWidgetManager();
  $.addDomWidget = dwManager.addDomWidget;
  $.fn.loadDomWidgets = dwManager.loader;
  $(document).ready(function () {
    $(this).loadDomWidgets();
  });
}(jQuery));
