defineWidget(function ($elem) {
  $elem.find('a').click(function () {
    return confirm('are you sure you want to go away from this page?');
  });
});
