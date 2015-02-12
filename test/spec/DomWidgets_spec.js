/*global $, describe, it, beforeEach, afterEach, expect, spyOn, jasmine, console*/

describe('Basic DOM Widget Example', function () {
  "use strict";
  var widgetsByName, originalLoader, originalAdder;
  beforeEach(function () {
    originalLoader = $.fn.loadDomWidgets;
    originalAdder = $.addDomWidget;
    widgetsByName = {};
  });
  afterEach(function () {
    $.fn.loadDomWidgets = originalLoader;
    $.addDomWidget = originalAdder;
  });
  function createSpyWidget(name) {
    widgetsByName[name] = jasmine.createSpy(name);
    $.addDomWidget(name, widgetsByName[name]);
  }

  function lookupSpyWidget(name) {
    return widgetsByName[name];
  }

  function expectWidgetToHaveBeenCalledWithElement(widgetName, element) {
    var spy = lookupSpyWidget(widgetName);
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.mostRecent().args[0][0]).toBe(element[0]);
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
  it('should complain if called out of jQuery context', function () {
    expect(function () {
      $.fn.loadDomWidgets.apply({});
    }).toThrow('Can\'t load Dom Widgets outside of jQuery scope');
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
    createSpyWidget('grandparent');
    createSpyWidget('parent');
    createSpyWidget('child');
    var grandparent = $('<div data-dom-widget="grandparent"/>'),
      parent = $('<div data-dom-widget="parent"/>').appendTo(grandparent),
      child = $('<div data-dom-widget="child"/>').appendTo(parent);

    grandparent.loadDomWidgets();

    expectWidgetToHaveBeenCalledWithElement('grandparent', grandparent);
    expectWidgetToHaveBeenCalledWithElement('parent', parent);
    expectWidgetToHaveBeenCalledWithElement('child', child);
  });
  it('should work with multiple root nodes', function () {
    createSpyWidget('a');
    createSpyWidget('b');
    var $container = $('<div/>').append('<div data-dom-widget="a"/><div data-dom-widget="b"/>');
    $container.children().loadDomWidgets();
    expectWidgetToHaveBeenCalledWithElement('a', $container.find('div:eq(0)'));
    expectWidgetToHaveBeenCalledWithElement('b', $container.find('div:eq(1)'));
  });
  it('return itself (to allow chaining)', function () {
    var elem = $('<div/>');
    expect(elem.loadDomWidgets()).toBe(elem);
  });
});
