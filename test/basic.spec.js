describe('Sample test', function () {
  it('should have jQuery plugin', function (done) {
    require(['jquery'], function ($) {
      expect(typeof $('body').loadDomWidgets).toBe('function');
      done();
    });
  });
});
