
var ApplicationController = require('../controllers/application-controller.js').ApplicationController
var Article = require('../models/article.js').Article;

var BlogController = function() {
  var controller = new ApplicationController();
  controller.viewsPath = "blog/";
   

  controller.index = function(req, res) {
    Article().all(function(result) {
      res.render(viewPath('index'), { 
        title: "My Blog",
        articles: result.articles
      });
    });
  };

  controller.create = function(req, res) {
    var article = Article().new();
    var title = req.query.title;
    var content = req.query.content;

    if (title && content) {
      article.title = title;
      article.content = content;
      article.save();
    } else {
      console.log("title and/or content were blank!");
    }
    res.redirect('/blog');
  };

  var viewPath = function(name) {
    return controller.viewsPath + name;
  };

  return controller;
};

exports.BlogController = BlogController;
