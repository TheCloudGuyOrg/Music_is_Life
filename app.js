'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const SESSION_SECRET = process.env.SESSION_SECRET;

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

// Service Routers
const s3MusicRouter = require('./routes/s3MusicRoutes.js');
app.use('/musicrepo', s3MusicRouter);

const ddbMusicRouter = require('./routes/ddbMusicRoutes.js');
app.use('/db', ddbMusicRouter);

// Define Port
const serverPort = process.env.PORT || 3000;

// Initialize Server
app.listen(serverPort, () => {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort); 
});

// Export App
module.exports = app;