var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var path = require('path');
var config = require('./server/configure'),
    mongoose = require('mongoose');


app = config(app);
mongoose.connect('mongodb://localhost/blogDb');
mongoose.connection.on('open', function(){
    console.log('Mongoose connected!');
});

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
config = require('./server/configure'),
app = config(app);

app.listen(app.get('port'), function(){
    console.log('The server is Up: https://localhost:'+app.get('port'));
});