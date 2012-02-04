var MongoModel = require("./mongo-model.js").MongoModel;

var Article = function() {

  var that = MongoModel();
  that.table = 'articles';

  // Define attributes here. make sure to add the save method to 'new'
  that.new = function() {
    return {
      title: null,
      content: null,
      save: that.save
    };
  };

  return that;
};

exports.Article = Article;
