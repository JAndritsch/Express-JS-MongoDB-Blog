
var Connection = function() {
  var that = {};
  that.open = function() {
    var Db = require('mongodb').Db;
    var Connection = require('mongodb').Connection;
    var Server = require('mongodb').Server;
    var BSON = require('mongodb').BSON;
    var ObjectID = require('mongodb').ObjectID;
    var host = "localhost";
    var port = 27017;

    var db = new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}));
    db.open(function(){});

  };
  return that;
};
exports.Connection = Connection;
