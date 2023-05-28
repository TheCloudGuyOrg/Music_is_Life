'use strict';

// --------------
// Module Imports
// --------------

// Use Express
const express = require('express');
const authApi = express.Router();
const passport = require('passport');


// ----------
// API Routes
// ----------

// POST register user API - POST /register
authApi.post('/register', async (request, response) => {
    const email = request.body.email;
    const password  = request.body.password;
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;

    const url = `http://localhost:3000/users/upload/?email=${email}&password=${password}&firstName=${firstName}&lastName=${lastName}`;
    console.log(url);
    try {
        const user = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });

        if(user.status === 500) {
            console.log('User already exists!');
            return response.redirect('/');
        }
        response.redirect('/'); 
    }
    catch (error) {
        response.status(500).json({ 
            message: error.message 
        });
    }
});

// POST login API - POST /login
authApi.post('/login',
    passport.authenticate('local', { failureRedirect : '/error'}),
    (request, response) => {
        request.session.authenticated = true;
        response.redirect('/profile');
    }
);

// GET home page API - GET /
authApi.get('/', (request, response) => {
    response.render('home');
});

// GET register user API - GET /register
authApi.get('/register', (request, response) => {
    response.render('register');
});

// GET login API - GET /login
authApi.get('/login', (request, response) => {
    response.render('login');
});

// GET error API - GET /error
authApi.get('/error', (request, response) => {
    response.render('error');
});

// GET user profile API - GET /profile
authApi.get('/profile', (request, response) => {
    response.render('profile', { user: request.user }); 
}); 

// GET user logout API - GET /logout
authApi.get('/logout', (request, response, next) => {
    request.logout(function(error) {
        if (error){
            return next(error);
        }
    });
    response.redirect('/login');
});


// ------------
// Export API's
// ------------

// Export API
module.exports = authApi;