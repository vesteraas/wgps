var wgps = require('../lib/wgps');

describe('Location', function() {
  it('transmits_location', function(done) {
    var _wgps = new wgps.WGPS('/dev/tty.usbmodemfd12411', { baudrate: 57600 });

    _wgps.on('location', function(data) {
      console.log(data);
      _wgps.close();
      done();
    });

    _wgps.on('error', function(error) {
      done(error);
    });
  });

  it('transmits_satellites', function(done) {
    var _wgps = new wgps.WGPS('/dev/tty.usbmodemfd12411', { baudrate: 57600 });

    _wgps.on('satellites', function(data) {
      console.log(data);
      _wgps.close();
      done();
    });

    _wgps.on('error', function(error) {
      done(error);
    });
  });
});
