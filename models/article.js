var MongoModel = require("./mongo-model.js").MongoModel;

var Article = function() {

  var that = MongoModel();
  that.table = 'articles';

  // Define attributes here. make sure to add 'save' and 'update' methods here
  that.new = function() {
    return {
      title: null,
      content: null,
      save: that.save,
      update: that.update
    };
  };

  return that;
};

exports.Article = Article;
