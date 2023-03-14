const express = require('express');
const router = express.Router();

//Controllers
const {
    getCheckSession,
    getLogout
} = require('./../controllers/authController')

const passport = require('passport');

router.post('/login',passport.authenticate('local-signin',{
    successRedirect :'/home',
    failureRedirect: '/login-error'
}));


router.post('/register',passport.authenticate('local-signup',{
    successRedirect :'/login',
    failureRedirect: '/register-error'
}));



router.get('/check',getCheckSession);
router.get('/logout',getLogout);

module.exports = router;
