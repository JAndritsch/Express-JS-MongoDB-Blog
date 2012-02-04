var ApplicationController = function() {
  var controller = {};

  // define global actions here. these will be in every controller
  
  // a before filter
  controller.before = function(callback) {
    callback();
  };
  return controller;
};

exports.ApplicationController = ApplicationController;
