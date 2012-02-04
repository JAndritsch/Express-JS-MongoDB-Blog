var ApplicationController = require('../controllers/application-controller.js').ApplicationController
var Article = require('../models/article.js').Article;

var ArticlesController = function() {
  var controller = new ApplicationController();
  controller.viewsPath = "articles/";
   

  controller.index = function(req, res) {
    var opts = {
      order: {createdAt: -1}
    };
    Article().all(opts, function(result) {
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
      Article().update(article, function(error, results) {
        console.log("error: ", error);
        console.log("reults: ", results);
        res.redirect("/articles/show/" + article._id);
      });
    } else {
      console.log("didn't update doc");
    }
  };

  controller.create = function(req, res) {
    var article = Article().new();
    var title = req.body.title;
    var content = req.body.content;

    if (title && content) {
      article.title = title;
      article.content = content;
      Article().save(article, function(error, result) {
        res.redirect('/articles/show/' + article._id);
      });
    } else {
      res.redirect("/articles/new");
    }
  };

  controller.destroy = function(req, res) {
    if (req.params.id) {
      Article().find(req.params.id, function(result) {
        var article = result.doc;
        if (article) {
          Article().destroy(article, function(error, result) {
            res.redirect('/articles');
          });
        } else {
            console.log("something failed with the delete");
        }
      });
    };
  };

  var viewPath = function(name) {
    return controller.viewsPath + name;
  };

  return controller;
};

exports.ArticlesController = ArticlesController;
