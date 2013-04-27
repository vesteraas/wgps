'use strict';

var util = require('util');
var serialport = require('serialport');
var serialPort = serialport.SerialPort;
var nmea_0183 = require('nmea-0183');
var events = require('events');

var _options = {
  baudrate: 57600
}

function WGPS(port, options) {
  options = options || {};
  options.__proto__ = _options;

  var self = this;

  this.port = port;
  this.options = options;

  process.nextTick(function () {
    self.open();
  });
}

util.inherits(WGPS, events.EventEmitter);

WGPS.prototype.open = function(callback) {
  var self = this;

  this.serial = new serialPort(this.port, { baudrate: this.options.baudrate, parser: serialport.parsers.readline('\n') });

  this.serial.on('data', function (data) {
    if (data.indexOf('$GPRMC') > -1) {
      try {
        var nmea = nmea_0183.parse(data);

        var location = {
          latitude: nmea.latitude,
          longitude: nmea.longitude
        }
        self.emit('location', location);
      } catch (error) {
        self.emit('error', error);
      }
    } else if (data.indexOf('$GPGSV') > -1) {
      try {
        var nmea = nmea_0183.parse(data);

        var satellites = {
          count: nmea.count
        }

        self.emit('satellites', satellites);
      } catch (error) {
        self.emit('error', error);
      }
    }
  });

  this.serial.on('error', function (error) {
    self.emit('error', error);
  });

  if (callback) {
    callback(null);
  }
};

WGPS.prototype.close = function(callback) {
  var self = this;

  if (!this.serial) {
    throw "Serial port is not open";
  }

  this.serial.close(function() {
    if (callback) {
      callback();
    }
  });
}

module.exports.WGPS = WGPS;