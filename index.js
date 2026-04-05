require('dotenv').config();
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

const express = require("express");
const session = require('express-session');
const passport = require('passport');
require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

app.get('/api/me', (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});