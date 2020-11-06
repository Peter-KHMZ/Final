var express = require('express');
var app = express();
var favicon      = require('serve-favicon');
//var Board = require('firmata');
var path = require('path');
var config = require('./server/configure');
var mongoose = require('mongoose');
// var createError  = require('http-errors')
app = config(app);
// mongoose.connect('mongodb://localhost/projectDB');
// mongoose.connection.on('open', function(){
//     console.log('Mongoose connected.')
// });


// // Board.requestPort(function(error, port){
// //     if(error)
// //     {
// //         console.log(error); 
// //         return;
// //     }
// //     var board = new Board(port.comName);
// //     board.on("ready", function(){
// //         console.log('Connected:' + modem);
// //         var ledOn = true;
// //         board.pinMode(13, board.MODES.OUTPUT);
// //         setInterval(function(){
// //             if(ledOn){
// //                 console.log('ON');
// //                 board.digitalWrite(13, board.HIGH);
// //             }
// //             else{
// //                 console.log('OFF');
// //                 board.digitalWrite(13, board.LOW);
// //             }
// //             ledOn = !ledOn;
// //         }, 500);
// //     })
// // })
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });


// if('development' === app.get('env')){
//     app.use(errorhandler());
// }
// return app;


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');


app.listen(app.get('port'), function(err){
    if(!err){
        console.log('The server is up: http://localhost:'+app.get('port'));
    }
    else
    {
        throw err;
    }
})
module.exports = app;