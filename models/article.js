var MongoModel = require("./mongo-model.js").MongoModel;

var Article = function() {

  var that = MongoModel();
  that.table = 'articles';

  that.new = function() {
    return {
      title: null,
      content: null
    };
  };

  return that;
};

exports.Article = Article;
