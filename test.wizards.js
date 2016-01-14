// References:
// http://sinonjs.org/docs/
// https://mochajs.org/
// http://chaijs.com/api/assert/
var assert = chai.assert;
describe('Spies', function() {

  afterEach(function() {
    if (castSpell.restore) {
      castSpell.restore();
    }
  });

  it('ensures goBerserk call function 3 times', function() {
    var spy = sinon.spy();
    goBerserk(spy);

    assert(spy.callCount, 3);
    assert.ok(spy.calledThrice);
  });

  it('castSpells 3 times in goBeastWizard', function() {
    var spy = sinon.spy(window, 'castSpell');
    goWizardBerserk();

    assert(spy.callCount, 3);
    assert.ok(spy.calledThrice);
  });

  it('should killHarry with avada kedvara', function() {
    var spy = sinon.spy(window, 'castSpell');
    killHarry();

    assert(spy.callCount, 3);
    assert.ok(spy.calledThrice);
    assert.ok(spy.alwaysCalledWith('avada kedavra'));
  });

});


describe('Stubs', function() {
  afterEach(function() {
    if ($.get.restore) {
      $.get.restore();
    }
  });

  it('should get train schedule', function() {
    var stub = sinon.stub($, 'get', function(url, callback) {
      callback('9 and three quarters');
    });
    var spy = sinon.spy();

    getTrainPlatform(spy);


    assert.ok(spy.alwaysCalledWith('9 and three quarters'));
    assert.ok(stub.calledOnce);
  });

});


describe('Fake XHR', function() {
  var xhr = sinon.useFakeXMLHttpRequest(),
      requests = [];

  beforeEach(function () {
      xhr.onCreate = function (req) { requests.push(req); };
  });

  afterEach(function () {
      xhr.restore();
  });

  it('should get train schedule', function() {
    getTrainPlatform(sinon.spy());

    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, "/hogwarts/train_schedule");
  });
});

describe('Fake server', function() {
  var server;

  beforeEach(function () { server = sinon.fakeServer.create(); });
  afterEach(function () { server.restore(); });

  it('should get train schedule', function() {
    server.respondWith(
      'GET',
      '/hogwarts/train_schedule',
      [200, { 'Content-Type': 'text/plain' }, '9 3/4']
    );


    var spy = sinon.spy();
    getTrainPlatform(spy);
    assert(spy.notCalled);

    server.respond();
    assert(spy.calledWith('9 3/4'));
    assert(spy.calledOnce);
  });

});


describe('BAD Faking time', function() {

  it('should apparate poorly', function(done) {
    apparate(function() {
      done();
    });
  });
});

describe('GOOD Faking time', function() {
  var clock;

  beforeEach(function () { clock = sinon.useFakeTimers(); });
  afterEach(function () { clock.restore(); });

  it('should apparate well', function() {
    var spy = sinon.spy();
    apparate(spy);

    clock.tick(999);
    assert(spy.notCalled);

    clock.tick(1);
    assert(spy.calledOnce);
  });
});
