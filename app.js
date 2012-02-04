var express = require('express')
  , ArticlesController = require('./controllers/articles-controller.js').ArticlesController
  ;
   
var connection = require("./config/database.js").Connection;
connection().open();

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


app.resources = function(name, controller) {
  this.get("/" + name, controller().index);
  this.get("/" + name + "/new", controller().new);
  this.post("/" + name, controller().create);
  this.get("/" + name + "/show/:id", controller().show);
  this.get("/" + name + "/edit/:id", controller().edit);
  this.post("/" + name + "/update", controller().update);
  this.get("/" + name + "/destroy/:id", controller().destroy);
};

// Routes
app.get('/', ArticlesController().index);
app.resources("articles", ArticlesController);



// Port settings
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
