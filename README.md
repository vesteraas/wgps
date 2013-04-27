usage:

var wgps = require('wgps');
var gps = new wgps.WGPS('/dev/tty.usbmodemfd12411', { baudrate: 57600 });

gps.on('location', function(data) {
  console.log(data);
});

gps.on('satellites', function(data) {
  console.log(data);
});

gps.on('error', function(error) {
  console.log(error);
});

