var Connection = function() {
  var that = {};

  var Database = require('mongodb').Db;
  var Connection = require('mongodb').Connection;
  var Server = require('mongodb').Server;
  var BSON = require('mongodb').BSON;
  var host = "localhost";
  var port = 27017;
  that.ObjectID = require('mongodb').ObjectID;

  that.db = function() {
    return new Database('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}));
  };

  that.open = function() {
    that.db().open(function(){});
  };

  return that;
};
exports.Connection = Connection;
