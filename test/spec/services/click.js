'use strict';

describe('Service: click', function () {

  // load the service's module
  beforeEach(module('130810HackathonApp'));

  // instantiate service
  var click;
  beforeEach(inject(function (_click_) {
    click = _click_;
  }));

  it('should do something', function () {
    expect(!!click).toBe(true);
  });

});
