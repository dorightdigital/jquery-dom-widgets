/*global $, describe, it, beforeEach, expect, spyOn, jasmine, console*/

describe('Basic DOM Widget Example', function () {
  var widgetsByName;
  beforeEach(function () {
    widgetsByName = {};
  });
  function createSpyWidget(name) {
    widgetsByName[name] = $.fn[name] = jasmine.createSpy(name);
  }
  function lookupSpyWidget(name) {
    return widgetsByName[name];
  }
  it('should load widget defined on root element', function () {
    createSpyWidget('myWidget');
    $('<div data-dom-widget="myWidget"/>').loadDomWidgets();
    expect(lookupSpyWidget('myWidget')).toHaveBeenCalled();
  });
  it('should load widget defined on root element', function () {
    createSpyWidget('myOtherWidget');
    $('<div data-dom-widget="myOtherWidget"/>').loadDomWidgets();
    expect(lookupSpyWidget('myOtherWidget')).toHaveBeenCalled();
  });
  it('should not fail when no widget provided', function () {
    expect(function () {
      $('<div/>').loadDomWidgets();
    }).not.toThrow();
  });
  it('should log a warning when unknown widget provided', function () {
    spyOn(console, 'warn');
    $('<div data-dom-widget="nonExistentPlugin"/>').loadDomWidgets();
    expect(console.warn).toHaveBeenCalledWith('no plugin found nonExistentPlugin');
  });
  it('should allow multiple widgets to be specified', function () {
    createSpyWidget('myWidget');
    createSpyWidget('myOtherWidget');
    $('<div data-dom-widget="myWidget myOtherWidget"/>').loadDomWidgets();
    expect(lookupSpyWidget('myWidget')).toHaveBeenCalled();
    expect(lookupSpyWidget('myOtherWidget')).toHaveBeenCalled();
  });
  it('should lookup dom widgets of children', function () {
    createSpyWidget('myWidget');
    $('<div><div data-dom-widget="myWidget"/></div>').loadDomWidgets();
    expect(lookupSpyWidget('myWidget')).toHaveBeenCalled();
  });
  it('should lookup dom widgets as deeply nested children', function () {
    createSpyWidget('myWidget');
    $('<div><div><div><div data-dom-widget="myWidget"/></div></div></div>').loadDomWidgets();
    expect(lookupSpyWidget('myWidget')).toHaveBeenCalled();
  });
  it('should apply each plugin to the correct dom element', function () {
    function expectWidgetToHaveBeenAppliedToElement(widgetName, element) {
      expect(lookupSpyWidget(widgetName).mostRecentCall.object[0]).toBe(element[0]);
    }

    createSpyWidget('grandparent');
    createSpyWidget('parent');
    createSpyWidget('child');
    var grandparent = $('<div data-dom-widget="grandparent"/>');
    var parent = $('<div data-dom-widget="parent"/>').appendTo(grandparent);
    var child = $('<div data-dom-widget="child"/>').appendTo(parent);

    grandparent.loadDomWidgets();

    expectWidgetToHaveBeenAppliedToElement('grandparent', grandparent);
    expectWidgetToHaveBeenAppliedToElement('parent', parent);
    expectWidgetToHaveBeenAppliedToElement('child', child);
  });
  it('return itself (to allow chaining)', function () {
    var elem = $('<div/>');
    expect(elem.loadDomWidgets()).toBe(elem);
  });
});
