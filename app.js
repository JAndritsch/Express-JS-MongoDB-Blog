var express = require('express')
  , PagesController = require('./controllers/pages-controller.js').PagesController
  , BlogController = require('./controllers/blog-controller.js').BlogController
  ;
   
var connection = require("./config/database.js").Connection;
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
  connection().open();
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', PagesController().index);
app.get(new RegExp(/^(\/pages)(\/)?$/), PagesController().index);
app.get('/pages/:name', PagesController().show);
app.get(new RegExp(/^(\/blog)(\/)?$/), BlogController().index);

// ideally this will be a post, but just a get for testing
app.get('/blog/create', BlogController().create);



// Port settings
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
