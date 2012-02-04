var PagesController = function() {
  var that = {};

  that.show = function(req, res) {
    res.render('index', { title: 'Pages: ' + req.params.name })
  };
  return that;
};

exports.PagesController = PagesController;
