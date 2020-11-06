// const express = require('express');
// const router = express.Router();
// const authUtils = require('../utils/auth');
// const passport = require('passport');
// const mongodb  = require('mongodb');
// // const MongoClient = require('mongodb').MongoClient;
// // const flash = require('connect-flash');

// // var dbrul             = 'mongodb://localhost:27017/';
// // const dbname          = 'smarthome';
// // var usersCollection = 'users' ;


// // Create login page
// // // --------------------------------------------------
// // router.get('/login', (req, res, next) => {
// //   const messages = req.flash();
// //   res.render('login', { messages });
// // });
// // // --------------------------------------------------


// // // Handle login request
// // // --------------------------------------------------
// // router.post('/login', passport.authenticate('local', 
// //   { failureRedirect: '/auth/login', 
// //     failureFlash: 'Wrong username or password'}), (req, res, next) => {
// //   res.redirect('/home');
// // });
// // --------------------------------------------------


// // Create register page
// // --------------------------------------------------
// router.get('/register', (req, res, next) => {
//   const messages = req.flash();
//   res.render('register', { messages });
// });
// // --------------------------------------------------


// // Handle register request
// // --------------------------------------------------
// router.post('/register', (req, res, next) => {
//   const registrationParams = req.body;
//   const users = req.app.locals.users;
//   // const { FName, LName, SName, day, month, year, sex,  } = req.body;
//   const payload = {
//     username: registrationParams.username,
//     password: authUtils.hashPassword(registrationParams.password),
  
// };
// //   (req, res, next)=>{
// //     MongoClient.connect('mongodb://localhost', function(err, client){
// //       if(err) throw err;
// //       const col = client.db(db).collection(users);
// //       var product  = {
// //           'product_name': req.body.FName,
// //           'price': req.body.LName,
// //           'category': req.body.SName
// //       };
// //       col.insert(product, function(err, result){
// //           if(err) throw err;
// //           client.close();
// //           res.redirect('/');
// //       });
// //     });
// //   }
//   users.insertOne(payload, (err) => {
//     if (err) {
//       req.flash('error', 'User account already exists.');
//     } else {
//       req.flash('success', 'User account registered successfully.');
//     }

//     res.redirect('/auth/register');
//   })
// });
// // --------------------------------------------------

// // Logout page
// // --------------------------------------------------
// router.get('/logout', (req, res, next) => {
//   req.session.destroy();
//   res.redirect('/');
// });

// module.exports = router; 