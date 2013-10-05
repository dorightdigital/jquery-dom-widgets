/*global $, console*/

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
      var widgetName = "" + this;
      if ($.fn[widgetName]) {
        $target[widgetName]();
      } else {
        warn('no plugin found ' + widgetName);
      }
    });
  });
};
$(document).ready(function () {
  $('body').loadDomWidgets();
});
