'use strict';

describe('Service: SimpleWebRTC', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var SimpleWebRTC;
  beforeEach(inject(function (_SimpleWebRTC_) {
    SimpleWebRTC = _SimpleWebRTC_;
  }));

  it('should do something', function () {
    expect(!!SimpleWebRTC).toBe(true);
  });

});
