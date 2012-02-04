var Connection = require("../config/database.js").Connection;

/* This is the wrapper class for all models 
*  It provides the basic default CRUD tasks that can
*  be imported into every other model.
* */
var MongoModel = function() {

  var that = {};
  that.db = Connection().db();

  that.getCollection = function(callback) {
    that.db.collection(that.table, function(error, collection) {
      collection.find().toArray(function(error, docs){
        callback(error, docs);
      });
    });
  };

  // Return ALL docs
  that.all = function(callback) {
    var result = {};
    that.getCollection(function(error, docs) {
      result.error = error;
      result.docs = docs;
      callback(result);
    });
  };

  // Save the new doc
  that.save = function() {
    var doc = this;
    doc.createdAt = new Date();
    that.db.collection(that.table, function(error, collection){
      collection.insert([doc], function(){});
    });
  };

  // Update the doc - NOT WORKING YET
  that.update = function() {
    var doc = this;
    that.db.collection(that.table, function(error, collection) {
      collection.update({_id: collection.db.bson_serializer.ObjectID.createFromHexString(doc._id)}, doc, null, false);
    });
  };

  // Find a doc by ID
  that.find = function(id, callback) {
    var result = {};
    that.db.collection(that.table, function(error, collection) {
      collection.findOne({_id: collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, doc) {
        result.error = error;
        result.doc = doc;
        result.doc.destroy = that.destroy;
        callback(result);
      });
    });
  };

  // Destroy a doc
  that.destroy = function() {
    var doc = this;
    that.db.collection(that.table, function(error, collection) {
      collection.remove({_id: doc._id});
    });
  };

  return that;
};

exports.MongoModel = MongoModel;
