import express from 'express';
const router = express.Router();

//Controllers
import { getCheckSession, getLogout } from './../controllers/authController.js';

import passport from 'passport';

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

export default router;