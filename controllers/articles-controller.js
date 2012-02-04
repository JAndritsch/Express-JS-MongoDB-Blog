var ApplicationController = require('../controllers/application-controller.js').ApplicationController
var Article = require('../models/article.js').Article;

var ArticlesController = function() {
  var controller = new ApplicationController();
  controller.viewsPath = "articles/";
   

  controller.index = function(req, res) {
    Article().all(function(result) {
      res.render(viewPath('index'), { 
        articles: result.docs
      });
    });
  };

  controller.new = function(req, res) {
    res.render(viewPath('new'), {
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
    res.redirect('/articles');
  };

  controller.destroy = function(req, res) {
    if (req.params.id) {
      Article().find(req.params.id, function(result) {
        var article = result.doc;
        if (article) {
          article.destroy();
        }
      });
    };
    res.redirect('/articles');
  };

  var viewPath = function(name) {
    return controller.viewsPath + name;
  };

  return controller;
};

exports.ArticlesController = ArticlesController;
