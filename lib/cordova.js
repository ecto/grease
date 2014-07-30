var cordovaLib = require('cordova-lib');
var cordova = cordovaLib.cordova;

cordovaLib.events.on('results', console.log);
cordovaLib.events.on('log', console.log);
cordovaLib.events.on('warn', console.warn);
cordovaLib.events.on('verbose', console.log);

module.exports = cordova;
