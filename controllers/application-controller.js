var ApplicationController = function() {
  var that = {};

  that.index = function(req, res) {
    res.render('index', { title: 'Express' })
  };
  return that;
};

exports.ApplicationController = ApplicationController;
