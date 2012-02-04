var PagesController = function() {
  var that = {};
  that.viewsPath = "pages/";

  that.view = function(name) {
    return that.viewsPath + name;
  };

  that.show = function(req, res) {
    res.render(that.view('index'), { title: 'Pages: ' + req.params.name })
  };
  return that;
};

exports.PagesController = PagesController;
