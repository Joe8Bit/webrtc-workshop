'use strict';

describe('Directive: WebRTCLocal', function () {

  // load the directive's module
  beforeEach(module('clientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-web-r-t-c-local></-web-r-t-c-local>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the WebRTCLocal directive');
  }));
});
