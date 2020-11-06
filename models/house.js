var express         = require('express'),
    router          = express.Router(),
    mongodb         = require('mongodb'),
    MongoClient     = mongodb.MongoClient;
    assert          = require('assert');


var dbrul             = 'mongodb://localhost:27017/';
const dbname          = 'smarthome';
var housesCollection = 'houses' ;

router.get('/house', function(req, res,next){
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
            res.render('house.handlebars', {data: docs});
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
        db.collection('houses').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
            if(err) throw err;
            res.send(docs);
            db.close();
        });
    });
});

router.post('/add', function(req, res, next){
    MongoClient.connect(dbrul, function(err, client){
        if(err)
        {
            console.log(err);
            throw err;
        }
            const col = client.db(dbname).collection(housesCollection);
            var house  = {
                'houseID'  : req.body.houseID,
                'houseControl'   : req.body.houseControl,
                'houseAddress'    : req.body.houseAddress,
                'ownerFN' : req.body.ownerFN,
                'ownerLN' : req.body.ownerLN,
                'ownerTel'  : req.body.ownerTel, 
                'ownerEmail'      : req.body.ownerEmail,
                'ownerAdd'    : req.body.ownerAdd

            };
            col.insert(house, function(err, result){
                if(err) throw err;
                client.close();
                res.redirect('/house');
            });
        
    });
});

router.get('/delete', function(req, res, next){
    var id = req.query.id;
    MongoClient.connect(dbrul, function(err, client){
        if(err) throw err;
        var db = client.db(dbname);
        db.collection('houses', function(err, house){
            house.deleteOne({_id: new mongodb.ObjectID(id)});
            if(err) throw err;
            else
            {
                client.close();
                res.redirect('/house');
            }
        });
    });
});

module.exports = router;