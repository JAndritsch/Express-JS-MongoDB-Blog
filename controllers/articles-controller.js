var ApplicationController = require('../controllers/application-controller.js').ApplicationController
var Article = require('../models/article.js').Article;

var ArticlesController = function() {
  var controller = new ApplicationController();
  controller.viewsPath = "articles/";
   

  // GET /articles
  controller.index = function(req, res) {
    // sort createdAt desc
    var opts = {
      sort: {createdAt: -1}
    };
    Article().all(opts, function(result) {
      res.render(viewPath('index'), { 
        articles: result.docs
      });
    });
  };

  // GET /articles/:id
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

  // GET /articles/new
  controller.new = function(req, res) {
    res.render(viewPath('new'), {errors: [], article: {title: "", content: ""}});
  };

  // GET /articles/edit/:id
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

  // POST /articles/update
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
        res.redirect("/articles/" + article._id);
      });
    } else {
      console.log("didn't update doc");
    }
  };

  // POST /articles
  controller.create = function(req, res) {
    var article = Article().new();
    var title = req.body.title;
    var content = req.body.content;

    article.title = title;
    article.content = content;
    Article().save(article, function(errors, result) {
      if (errors) {
        res.render(viewPath("new"), {errors: errors.split("\n"), article: article});
      } else {
        res.redirect('/articles/' + article._id);
      }
    });
  };

  // GET /articles/destroy/:id
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
