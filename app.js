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

// Routes
app.get('/', ArticlesController().index);
app.get(new RegExp(/^(\/articles)(\/)?$/), ArticlesController().index);
app.get('/articles/create', ArticlesController().create);
app.get('/articles/destroy/:id', ArticlesController().destroy);


// Port settings
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
