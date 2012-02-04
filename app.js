var express = require('express')
  , ApplicationController = require('./controllers/application-controller.js').ApplicationController
  , PagesController = require('./controllers/pages-controller.js').PagesController
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
app.get('/', ApplicationController().index);
app.get('/pages/:name', PagesController().show);


// Port settings
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
