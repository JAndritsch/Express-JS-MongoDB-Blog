var Connection = require("../config/database.js").Connection;
var Article = function() {

  var that = {};
  that.db = Connection().db();
  that.table = 'articles';

  // Define attributes here. make sure to add the save and delete methods
  that.new = function() {
    return {
      title: null,
      content: null,
      save: that.save
    };
  };

  that.getCollection = function(callback) {
    that.db.collection(that.table, function(error, collection) {
      collection.find().toArray(function(error, articles){
        callback(error, articles);
      });
    });
  };

  that.all = function(callback) {
    var result = {};
    that.getCollection(function(error, articles) {
      result.error = error;
      result.articles = articles;
      callback(result);
    });
  };

  that.save = function() {
    var article = this;
    article.createdAt = new Date();
    that.db.collection(that.table, function(error, collection){
      collection.insert([article], function(){});
    });
  };

  that.find = function(id, callback) {
    var result = {};
    that.db.collection(that.table, function(error, collection) {
      collection.findOne({_id: collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, article) {
        result.error = error;
        result.article = article;
        result.article.destroy = that.destroy;
        callback(result);
      });
    });
  };

  that.destroy = function() {
    var article = this;
    that.db.collection(that.table, function(error, collection) {
      collection.remove({_id: article._id});
    });
  };


  return that;
};

exports.Article = Article;
