var MongoModel = require("./mongo-model.js").MongoModel;

var Article = function() {

  var that = new MongoModel();
  that.table = 'articles';

  // setup validations
  that.validates("title.length > 0");
  that.validates("content.length > 0");
  that.validatesUniquenessOf("title");

  return that;
};

exports.Article = Article;
