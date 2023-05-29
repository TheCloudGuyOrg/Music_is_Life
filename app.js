'use strict';

// --------------
// Module Imports
// --------------

// Use Express
const express = require('express');
const app = express();

// Use Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Helmet
const helmet = require('helmet');
app.use(helmet());

// Import AWS Helper Functions
const { getUserByEmail } = require('./helpers/ddbHelperFunctions.js');

// --------
// Varables
// --------

// Import Varables
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const SESSION_SECRET = process.env.SESSION_SECRET;

// Define Port
const serverPort = process.env.PORT || 3000;


// -------------------
// Define User Session
// -------------------

// Defining User Sessions 
const session = require('express-session');
const storeSession = new session.MemoryStore(); //Dev Only Move to DB for Prod Sessions

app.use(
    session({
        secret: SESSION_SECRET, 
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, 
            secure: false,
            sameSite: 'none'
        },
        resave: false,
        saveUninitialized: false,
        storeSession
    })
);


//--------------
// Athentication
//--------------

//Setting up Views
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

//Ensure Autnentication Function
const ensureAuthentication = (request, response, next) => {
    if (request.session.authenticated) {
        return next();
    } 
    else {
        response.status(403).json({ msg: 'You\'re not authorized to view this page' });
    }
};

//Use Passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    return done(null, {
        email: user.Items[0].Email.S,
    });
}); 

passport.deserializeUser((user, done) => {
    getUserByEmail(user)
        .then((response, error) => {
            const email = user.email;
            if (error) {
                return done(error);
            }
            return done(null, email);
        });
}); 
  
passport.use(new LocalStrategy(
    function (username, password, done) {
        getUserByEmail(username)
            .then((user) => {
                if(user == null) {
                    return done(null, false);
                }
                else {
                    const foundMatch = bcrypt.compare(password, user.Items[0].Password.S);
    
                    foundMatch.then((match) => {
                        if(match == false) {
                            return done(null, false);
                        } 
      
                        return done(null, user);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    })
);


// ----------
// API Routes
// ----------

// Service Routers
const authRouter = require('./routes/authRoutes.js');
app.use('/', authRouter);

const musicRouter = require('./routes/musicRoutes.js');
app.use('/api', ensureAuthentication, musicRouter);

const usersRouter = require('./routes/userRoutes.js');
app.use('/users', ensureAuthentication, usersRouter);

// -----------
// Init Server
// -----------

// Initialize Server
app.listen(serverPort, () => {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort); 
});


// ------------
// Export API's
// ------------

// Export App
module.exports = app;