
var Connection = function() {
  var that = {};

  var Db = require('mongodb').Db;
  var Connection = require('mongodb').Connection;
  var Server = require('mongodb').Server;
  var BSON = require('mongodb').BSON;
  var ObjectID = require('mongodb').ObjectID;
  var host = "localhost";
  var port = 27017;

  that.db = function() {
    return new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}));
  };

  that.open = function() {
    that.db().open(function(){});
  };

  return that;
};
exports.Connection = Connection;
