var express         = require('express'),
    router          = express.Router(),
    mongodb         = require('mongodb'),
    MongoClient     = mongodb.MongoClient;
    assert          = require('assert');


var dbrul             = 'mongodb://localhost:27017/';
const dbname          = 'smarthome';
var housesCollection = 'assistance' ;

router.get('/', function(req, res,next){
    MongoClient.connect(dbrul, function(err, client){
        if(err)
        {
            console.log(err);
            throw err;
        }
        data = '';
        const col = client.db(dbname).collection(housesCollection);
        col.find().toArray(function(err, docs){
            if(err) throw err;
            res.render('assistance.handlebars', {data: docs});
            client.close();
        })
    });
});

router.get('/fetchdata', function(req, res, next){
    var id = req.query.id;
    MongoClient.connect(dbrul, function(err, db){
        if(err)
        {
            console.log(err);
            throw err;
        }
        data = '';
        db.collection('assistance').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
            if(err) throw err;
            res.send(docs);
            db.close();
        });
    });
});

router.post('/added', function(req, res, next){
    MongoClient.connect(dbrul, function(err, client){
        if(err)
        {
            console.log(err);
            throw err;
        }
            const col = client.db(dbname).collection(housesCollection);
            var house  = {
                'FName'  : req.body.FName,
                'LName'   : req.body.LName,
                'Sname'    : req.body.Sname,
                'HouseID' : req.body.HouseID,
                'phone' : req.body.phone,
                'mail'  : req.body.mail, 
                'addrss'      : req.body.addrss,
            

            };
            col.insert(house, function(err, result){
                if(err) throw err;
                client.close();
                res.redirect('/assistance');
            });
        
    });
});

router.get('/deleted', function(req, res, next){
    var id = req.query.id;
    MongoClient.connect(dbrul, function(err, client){
        if(err) throw err;
        var db = client.db(dbname);
        db.collection('assistance', function(err, house){
            house.deleteOne({_id: new mongodb.ObjectID(id)});
            if(err) throw err;
            else
            {
                client.close();
                res.redirect('/assistance');
            }
        });
    });
});

module.exports = router;