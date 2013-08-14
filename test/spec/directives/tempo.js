'use strict';

describe('Directive: tempo', function () {
  beforeEach(module('130810HackathonApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<tempo></tempo>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the tempo directive');
  }));
});
