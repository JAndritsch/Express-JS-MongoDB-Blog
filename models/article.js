var MongoModel = require("./mongo-model.js").MongoModel;

var Article = function() {

  // only required parts
  var that = new MongoModel();
  that.table = 'articles';
  that.attributes = {
    title: "",
    content: ""
  };

  // optional 'before' calls
  that.beforeCreate = function() {
    console.log("I'm running before creating a new Article!");
  };

  // validations
  that.validates("title.length > 0");
  that.validates("title != 'test'");
  that.validates("content.length > 0");
  that.validatesUniquenessOf("title");


  return that;
};

exports.Article = Article;
