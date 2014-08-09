describe('Sample test', function () {
  it('should have jQuery plugin', function (done) {
    require(['jquery'], function ($) {
      var $dom = $('<div/>').attr('data-dom-widget', 'drd.demo.confirmBeforeExit');
      var $link = $('<a href="/abc"/>').appendTo($dom);
      $dom.loadDomWidgets();
      setTimeout(function () {
        spyOn(window, 'confirm');
        $link.trigger('click');
        expect(window.confirm).toHaveBeenCalledWith('are you sure you want to go away from this page?');
        done();
      }, 100);
    });
  });
});
