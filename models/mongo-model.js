var Connection = require("../config/database.js").Connection;

/* This is the wrapper class for all models 
*  It provides the basic default CRUD tasks that are
*  imported into every other model.
* */
var MongoModel = function() {

  var that = {};
  that.db = Connection().db();
  that.objectID = Connection().ObjectID;
  that.validations = [];
  that.uniqueAttributes = [];
  that.errors = [];

  that.new = function() {
    return that.attributes;
  };

  /*
  * opts types:
  *   sort: {key: "order"} * Note: Mongo sorts using 1, -1 for asc, desc
  *   where: {key: "value", anotherKey: "anotherValue"} for specific fields 
  *     or $where: "this.key.match(/^someRegEx$/i)" for an expression
  *   limit: x, x = number returned
  *   skip: x, x = at what index to start returning results
  *       ** skip and limit are best used together for pagination
  */
  that.getCollection = function(opts, callback) {
    that.db.collection(that.table, function(error, collection) {
      collection.find(opts.where).skip(opts.skip).limit(opts.limit).sort(opts.sort).toArray(function(error, docs){
        callback(error, docs);
      });
    });
  };

  // Return ALL docs. Makes use of getCollection for passing in options to the query such as sorting, where clauses
  // limits, etc...
  that.all = function(opts, callback) {
    var result = {};
    that.getCollection(opts, function(error, docs) {
      result.error = error;
      result.docs = docs;
      callback(result);
    });
  };

  // Save the new doc
  that.save = function(doc, callback) {
    doc.createdAt = new Date();
    if (that.beforeCreate != undefined) {
      that.beforeCreate();
    }
    that.db.collection(that.table, function(error, collection){
      if (that.validationsPass(doc)) {
        collection.insert([doc], function(error, results){
          callback(error, results);
        });
      } else {
        callback(that.errors.join("\n"), null);
      }
    });
  };

  // Update the doc - NOT WORKING YET 
  that.update = function(doc, callback) {
    doc.updatedAt = new Date();
    that.db.collection(that.table, function(error, collection) {
      collection.update({_id: new that.objectID(doc._id)}, doc);
    });
  };

  // Find a doc by ID
  that.find = function(id, callback) {
    var result = {};
    that.db.collection(that.table, function(error, collection) {
      collection.findOne({_id: new that.objectID(id)}, function(error, doc) {
        result.error = error;
        result.doc = doc;
        callback(result);
      });
    });
  };

  // Destroy a doc
  that.destroy = function(doc, callback) {
    that.db.collection(that.table, function(error, collection) {
      collection.remove({_id: doc._id}, function(error, results) {
        callback(error, results);
      });
    });
  };

  that.validationsPass = function(doc) {
    that.runValidations(doc); 
    that.runUniquenessCheck(doc);
    if (that.errors.length == 0) {
      return true;
    }
    return false;
  };
  
  that.runValidations = function(doc) {
    var currentRule;
    var evalString;
    var currentUniqueAttr;
    for (var i = 0; i < that.validations.length; i++) {
      currentRule = that.validations[i]; 
      evalString = "doc." + currentRule; 
      if (!eval(evalString)) {
        that.errors.push("Validation failed on '" + evalString.replace("doc.", "") + "'");
      }
    }
  };

  that.runUniquenessCheck = function(doc) {
    var opts = {};
    var key, val;
    var pair = {};
    for (var i = 0; i < that.uniqueAttributes.length; i++) {
     key = that.uniqueAttributes[i];
      val = doc[that.uniqueAttributes[i]];
      pair[key] = val;
      opts.where = pair;
      // need to somehow force this to be synchronous
      // or i'm going about it completely wrong
      that.db.collection(that.table, function(error, collection) {
        collection.find(opts.where).toArray(function(error, docs){
          if (docs.length > 0) {
            that.errors.push("An entry with '" + key + "' = '" + val + "' already exists in '" + that.table + "'");
          }
        });
      });
    }
  };

  that.validates = function(rule) {
    that.validations.push(rule);
  };

  that.validatesUniquenessOf = function(attr) {
    that.uniqueAttributes.push(attr); 
  };
  
  return that;
};

exports.MongoModel = MongoModel;
