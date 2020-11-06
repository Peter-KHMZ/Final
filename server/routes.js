var express  = require('express'),
    router   = express.Router(),
    home     = require('../controllers/home'),
    workers  = require('../controllers/workers'),
    house   = require('../controllers/house'),
    controls = require('../controllers/control'),
    login    = require('../controllers/login')
    about    = require('../controllers/about'),
    customer = require('../controllers/customer'),
    works    = require('../models/workers'),
    houses   = require('../models/house') ,
    assistance= require('../models/customer'),
    us       = require('../controllers/us'),
    register = require('../controllers/Register')
    condition = require('../controllers/condition'),
    users     = require('../controllers/users'),
    profiles  = require('../controllers/profile'); 


module.exports = function(app){
    router.get('/home', home.index);
    // router.get('/images/:imge_id', image.index);
    // router.get('/workers/', workers.index);
    app.use('/workers/', works);
    app.use('/house/', houses);
    app.use('/assistance', assistance)
    // router.get('/house/', house.houseIndex);
    router.get('/control', controls.control);
    router.get('/about',about.abouts);
    router.get('/auth/register', register.registers);
    router.get('/profile', profiles.profile)
    // router.get('/assistance', customer.customers);
    router.get('/us', us.us);
    router.get('/terms', condition.condition);
    router.get('/login', login.login);
    router.get('/users', users.user)
    // router.get('/images', image.create);
    // router.get('/images/:img_id/like', image.like);
    app.use(router);
}
