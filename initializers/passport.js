// var config = require('./oauth.js');
// var passport = require("passport");
// var TwitterStrategy = require("passport-twitter").Strategy;
// var util = require('util');
 
// exports.passport = function(api, next){
 
//   var doBasicAuth = function (req, res, connection, next) {
//     passport.authenticate("twitter", {session: true},
//       function (err, user, info, extra) {
//         if (err) {
//           connection.error = err;
//           return next(connection, false);
//         }
//         if (!user) {
//           // api.log('Not Authenticated');
//           // Unauthorized
//           connection.rawConnection.responseHttpCode = 401;
//           return next(connection, false);
//         }
//         // api.log('user: '+JSON.stringify(user))
//         user.connection_id = connection.id;
//         connection.rawConnection.req.logIn(user, function () {
//           next(connection, true);
//         });
//       })(req, res);
//   };
 
//   // Set up session variables
//   var setupSession = function (connection, actionTemplate, next) {
//     // api.log("setupSession, connection.id: "+ connection.id);
//     connection.rawConnection.req.session = {passport: {user: connection.id}};
//     next(connection, true);
//   };
  
//   // Init Passport and Passport's Session integration
//   // (adds Passport methods/properties to the request and response objects)
//   var usePassportMiddleware = function (connection, actionTemplate, next) {
//     passport.initialize()(connection.rawConnection.req, connection.rawConnection.res, function () {
//       passport.session()(connection.rawConnection.req, connection.rawConnection.res, function () {
//         next(connection, true);
//       });
//     });
//   };
  
//   // Determine if Authentication is required,
//   // Attempt login if credentials are supplied
//   var doPassportAuthenticate = function (connection, actionTemplate, next) {
//     // Do not try to authenticate if already logged in
//     if (connection.rawConnection.req.isAuthenticated()) {
//       // api.log('already authenticated, nothing for passport to do');
//       return next(connection, true);
//     }
//     // Requires login
//     if (!!actionTemplate.authenticated) {
//       // api.log("not yet authenticated, authorization required");
//       // passport expects the credentials in a 'body' key inside of
//       // the request object, we're fudging them in here
//       return doBasicAuth(util._extend({body:connection.params},connection.rawConnection.req),
//         connection.rawConnection.res, connection, next);
//     }
//     // api.log('authentication not necessary');
//     next(connection, true);
//   };
 
//   api.actions.preProcessors.push(setupSession);
//   api.actions.preProcessors.push(usePassportMiddleware);
//   api.actions.preProcessors.push(doPassportAuthenticate);
 
 
//   passport.use(new TwitterStrategy({
//       consumerKey: config.twitter.consumerKey,
//       consumerSecret: config.twitter.consumerSecret,
//       callbackURL: config.twitter.callbackURL
//     },
//     // should supply a validated user object suitable
//     // for serializing into the session, or null
//     // if credentials are invalid
//     function(accessToken, refreshToken, profile, next){
//       User.findOne({ oauthID: profile.id }, function(err, user) {
//         if(err) { console.log(err); }
//         if (!err && user != null) {
//           next(null, user);
//         } else {
//           var user = new User({
//             oauthID: profile.id,
//             name: profile.displayName,
//             created: Date.now()
//           });
//           user.save(function(err) {
//             if(err) {
//               console.log(err);
//               next(null, false, {message: 'failure!'});
//             } else {
//               console.log("saving user ...");
//               next(null, user);
//             };
//           });
//         };
//       });
//     };
//   ));
 
//   passport.serializeUser(function (user, done) {
//     // api.log("passport.serializeUser: "+JSON.stringify(user));
//     // Faking a connection object as the first argument for
//     // the session's save method. In this case it only needs
//     // the connection id so it's safe to leave sparse
//     api.session.save({id:user.connection_id}, user, function (err) {
//       done(err, user.connection_id);
//     });
//   });
 
//   passport.deserializeUser(function (connection_id, done) {
//     // api.log("passport.deserializeUser connection_id: "+JSON.stringify(connection_id));
//     // Faking a connection object as the first argument for
//     // the session's load method. In this case it only needs
//     // the connection id so it's safe to leave sparse
//     api.session.load({id:connection_id}, function (err, user) {
//       // api.log("deserialized User: "+JSON.stringify(user));
//       done(null, user);
//     });
//   });
 
//   api.passport = passport;
 
//   next();
// }