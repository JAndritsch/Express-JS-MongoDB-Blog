
var ApplicationController = require('../controllers/application-controller.js').ApplicationController

var PagesController = function() {
  var controller = new ApplicationController();
  controller.viewsPath = "pages/";

   
  controller.index = function(req, res) {
    res.render(viewPath('index'), { title: "Home page" });
  };

  controller.show = function(req, res) {
    res.render(viewPath('show'), { title: 'Pages: ' + req.params.name })
  };

  var viewPath = function(name) {
    return controller.viewsPath + name;
  };

  return controller;
};

exports.PagesController = PagesController;
