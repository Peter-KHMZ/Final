var express         = require('express'),
    router          = express.Router(),
    mongodb         = require('mongodb'),
    MongoClient     = mongodb.MongoClient;
    assert          = require('assert');


var dbrul             = 'mongodb://localhost:27017/';
const dbname          = 'smarthome';
var workersCollection = 'workers' ;

router.get('/', function(req, res,next){
    MongoClient.connect(dbrul, function(err, client){
        if(err)
        {
            console.log(err);
            throw err;
        }
        data = '';
        const col = client.db(dbname).collection(workersCollection);
        col.find().toArray(function(err, docs){
            if(err) throw err;
            res.render('worker.handlebars', {data: docs});
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
        db.collection('workers').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
            if(err) throw err;
            res.send(docs);
            db.close();
        });
    });
});

router.post('/adds', function(req, res, next){
    MongoClient.connect(dbrul, function(err, client){
        if(err)
        {
            console.log(err);
            throw err;
        }
            const col = client.db(dbname).collection(workersCollection);
            var worker  = {
                'firstName'  : req.body.firstName,
                'lastName'   : req.body.lastName,
                'sirname'    : req.body.sirname,
                'speciality' : req.body.speciality,
                'telephone'  : req.body.telephone, 
                'email'      : req.body.email,
                'address'    : req.body.address

            };
            col.insert(worker, function(err, result){
                if(err) throw err;
                client.close();
                res.redirect('/workers');
            });
        
    });
});

router.get('/delete', function(req, res, next){
    var id = req.query.id;
    MongoClient.connect(dbrul, function(err, client){
        if(err) throw err;
        var db = client.db(dbname);
        db.collection('workers', function(err, worker){
            worker.deleteOne({_id: new mongodb.ObjectID(id)});
            if(err) throw err;
            else
            {
                client.close();
                res.redirect('/workers');
            }
        });
    });
});

module.exports = router;