var app = require('express')();
app.get('/', function(req,res){
    res.send('');
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = app.listen(port, host, function(){
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Listening on http://%s:%s...', host, port);
});