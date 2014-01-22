
/**
 * Module dependencies.
 */
require('./db');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var Title = require('./models/Title');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname,'frontend','public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

app.get('/', routes.index);
app.get('/title/q',function(req,res) {
  console.log('title query: '+req.query.key);
  Title.find({TitleName:{$regex:'.*'+escapeRegExp(req.query.key||'')+'.*',$options:'i'}}).limit(10).exec(function(err, docs) {
    res.json(!err ? docs : {error:err});
  });
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});