
var ArticleModel = function() {

  var that = {};
  
  that.getCollection = function(callback) {
    that.db.collection('articles', function(error, article_collection) {
      if (error) {
        callback(error);
      } else {
        callback(null, article_collection); 
      }
    });
  };

  that.findAll = function(callback) {
    that.getCollection(function(error, article_collection) {
      if (error) {
        callback(error);
      } else {
        article_collection.find().toArray(function(error, results) {
          if (error) { 
            callback(error); 
          } else { 
            callback(null, results);
          }
        });
      }
    });
  };

  that.findById = function(id, callback) {
    that.getCollection(function(error, article_collection) {
      if (error) {
        callback(error);
      } else {
        article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if (error) { 
            callback(error); 
          } else {
            callback(null, result);
          }
        });
      }
    });
  };

  that.save = function(articles, callback) {
    that.getCollection(function(error, article_collection) {
      if (error) { 
        callback(error);
      } else {
        if (typeof(articles.length)=="undefined") {
          articles = [articles];
        }
        for (var i = 0;i < articles.length; i++ ) {
          article = articles[i];
          article.created_at = new Date();
          if (article.comments === undefined ) {
            article.comments = [];
          }
          for(var j = 0; j < article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
        }

        article_collection.insert(articles, function() {
          callback(null, articles);
        });
      }
    });

  };

  return that;
};

// Make it available to exports
exports.ArticleModel = ArticleModel;
