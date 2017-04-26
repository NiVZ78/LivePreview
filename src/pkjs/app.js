/*
var Clay = require('clay');
var clayConfig = require('config');
var customClay = require('custom-clay');
var clay = new Clay(clayConfig, customClay);
*/

var Clay = require('pebble-clay');
var clayConfig = require('./config');
var customClay = require('./custom-clay');
var clay = new Clay(clayConfig, customClay);