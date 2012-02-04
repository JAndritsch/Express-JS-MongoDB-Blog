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

  controller.show = function(req, res) {
    if (req.params.id) {
      Article().find(req.params.id, function(result) {
        var article = result.doc;
        if (article) {
          res.render(viewPath('show'), {
            article: article
          });
        } else {
          res.redirect("/articles");
        }
      });
    };

  };

  controller.new = function(req, res) {
    res.render(viewPath('new'), {});
  };

  controller.edit = function(req, res) {
    if (req.params.id) {
      Article().find(req.params.id, function(result) {
        var article = result.doc;
        if (article) {
          res.render(viewPath('edit'), {
            article: article
          });
        } else {
          res.redirect("/articles");
        }
      });
    };
  };

  controller.update = function(req, res) {
    var article = Article().new();
    var title = req.body.title;
    var content = req.body.content;
    var _id = req.body.id;
    

    if (title && content && _id) {
      article.title = title;
      article.content = content;
      article._id = _id;
      console.log("here is the new article right before saving: ", article);
      article.update();
    }
    res.redirect("/articles/show/" + article._id);
  };

  controller.create = function(req, res) {
    var article = Article().new();
    var title = req.body.title;
    var content = req.body.content;

    if (title && content) {
      article.title = title;
      article.content = content;
      article.save();
    } else {
      console.log("title and/or content were blank!");
    }
    res.redirect('/articles/show/' + article._id);
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
