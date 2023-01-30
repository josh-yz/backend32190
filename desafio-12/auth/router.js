const express = require('express');
const router = express.Router();

//Controllers
const authController = require('./authController')

const passport = require('passport');


// router.post('/login',authController.postLogin);

// router.post('/login',passport.authenticate('local-signup',{
//     successRedirect :'/home',
//     failureRedirect: '/login'
// }));

router.post('/login',passport.authenticate('local-signin',{
    successRedirect :'/home',
    failureRedirect: '/login-error'
}));


router.post('/register',passport.authenticate('local-signup',{
    successRedirect :'/login',
    failureRedirect: '/register-error'
}));



router.get('/check',authController.getCheckSession);
router.get('/logout',authController.getLogout);

module.exports = router;


//https://stackoverflow.com/questions/49030707/how-to-send-json-data-under-passport-local-strategy


// router.post(
//     "/login",passport.authenticate("local", {
//     failureMessage: true,}),login);