const express = require('express');
const port = 8000;
const app = express();
const mongoose = require('mongoose');    
const db = require('./config/mongoose');                                            // Fetching Mongoose configuration file
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalStrategy = require('./config/passport_local_strategy');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');



app.set('view engine', 'ejs');
app.set('views', './view');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({
    name: 'session-cookies',
    secret: 'secret phrase to encode cookes',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 30)
    },
    store: MongoStore.create({                                      // mongo store is used to store cookie in db.
            mongoUrl: 'mongodb://localhost/authenticationDemo',
            autoRemove: 'disabled',
        }, function (error) {
            console.log(error || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

app.listen(port, function(error){
    if(error) console.log("Error in Starting Express Server");
    else console.log("Express Server Started Successfully");
});