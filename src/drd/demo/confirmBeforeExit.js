define([], function () {
  return {
    init: function ($elem) {
      var $tmp = $('<input type=file/>').attr('name', $elem.attr('data-field-name'));
      $elem.append($tmp);
      $elem.click(function () {
        $tmp.click();
      })
    }
  };
});
