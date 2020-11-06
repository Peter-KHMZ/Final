const express = require('expresss');
const Router  = express.Router();
const authUtils = require('../utils/auth');
const passport  = require('passport');
const flash = require('connect-flash');

Router.get('/login', (req, res, next)=>{
    const messages = req.flash();
    res.re
})