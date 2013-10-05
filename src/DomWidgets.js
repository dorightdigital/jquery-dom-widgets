/*global $, console*/

$.fn.loadDomWidgets = function () {
  var $target = $(this);
  if ($target.length === 0) {
    return;
  }
  var attr = $(this).attr('data-dom-widget');
  var warn = (console && console.warn) || function () {};
  $(this).find('[data-dom-widget]').loadDomWidgets();
  if (!attr) {
    return;
  }
  $.each(attr.split(' '), function () {
    var widgetName = ""+this;
    if ($.fn[widgetName]) {
      $target[widgetName]();
    } else {
      warn('no plugin found ' + widgetName);
    }
  });
};
