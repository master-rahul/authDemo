const { response } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField : 'email',
    }, async function (email, password, done) {
    await User.findOne({ email: email }).then((user) => {
        if(!user){
            console.log("User Not Found");
            return done(null, false);
        }
        else if (user.password != password) {
            console.log("Password Error");
            return done(null, false);
        }
        else {
            console.log('User Found');
            return done(null, user);
        }
    }).catch(function (error) {
        return done(error);
    });
    }
));
// passport.use(new LocalStrategy({
//         usernameField: 'email'},
//         function (email, password, done) {
            
//             try {
//                 const val = User.findOne({ email: email }); 
//                 if(val == null) return response.redirect('back'); 
//                 else if (!val || val.password != password) return response.redirect('back'); 
//                 else return response.redirect('user/profile');
//             } catch (error) {
//                 return response.redirect('back'); 
//             }
           
//            //console.log(val);     
//             return response.redirect('user/profile');
//         }
// ));


passport.serializeUser(function (user, done) {
    console.log('serialize');
    done(null, user.id);
});
// de-serialize the user from the keys present in cookie.
passport.deserializeUser(function (id, done) {
    console.log('de-serialize');
    User.findById(id).then((user) => {  
        return done(null, user);
    }).catch(function (error) {
        return done(error);
    })
});

passport.checkAuthentication = function (request, response, next) { // check whether the user is authenticated.
    console.log('checkAuthentication() called');
    // passport sets the isAuthenticated property in request.
    if (request.isAuthenticated()) return next();                    // if user is signed in than pass the request to the next function(controller action).
    return response.redirect('/user/signIn');                      // user is not signed-in or authenticated.
}

passport.setAuthenticatedUser = function (request, response, next) {
    // request.user contains the current signed user form the session cookie and we are sending the user data to response.locals for the views
    if (request.isAuthenticated()) response.locals.user = request.user;
    return next();
}

passport.redirectProfile = function (request, response, next) {
    if (request.isAuthenticated()) return response.redirect('/user/profile');
    return next();
}

module.exports = passport;