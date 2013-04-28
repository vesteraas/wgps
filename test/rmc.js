var aarlogic = require('aarlogic_gps_3t');
var assert = require('assert');

describe('NMEA', function() {
  it('converts GPRMC', function() {

    var rmc = '$GPRMC,110904.000,A,5955.5588,N,01042.8319,E,0.00,,280413,,,A*79';
    var nmea = aarlogic.parse(rmc);

    assert.deepEqual({"hours":11,"minutes":9,"seconds":4}, nmea.time);
    assert.equal(59.925979999999996, nmea.latitude);
    assert.equal(10.713864999999998, nmea.longitude);
  });

  it('it converts GPRMC 2', function() {

    var rmc = '$GPRMC,110906.000,A,5955.5588,N,01042.8319,E,0.00,,280413,,,A*7B';
    var nmea = aarlogic.parse(rmc);

    console.log(nmea)
    assert.deepEqual({"hours":11,"minutes":9,"seconds":6}, nmea.time);
    assert.equal('59.925979999999996', nmea.latitude);
    assert.equal('10.713864999999998', nmea.longitude);
  });
});
