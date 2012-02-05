var MongoModel = require("./mongo-model.js").MongoModel;

var Article = function() {

  var that = new MongoModel();
  that.table = 'articles';

  // setup validations
  that.addValidation("title.length > 0");
  that.addValidation("content.length > 0");

  return that;
};

exports.Article = Article;
