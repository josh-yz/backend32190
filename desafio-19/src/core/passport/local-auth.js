import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userService from '../../api/services/user.js';

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(async (user, done) => {
    const userb = await userService.findByPk(user.id);
    done(null, userb);
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await userService.findEmail(email.trim());
    if (user) {
        return done(null, false, 'El email no existe')
    }
    const userNew = await userService.create({email,password});
    done(null, userNew)
}));


passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await userService.findEmail(email.trim());

    if (!user) {
        return done(null, false, req.flash('signinMessage', 'El usuario no existe'))
    }
    if(!user.comparePassword(password)){
        return done(null,false,req.flash('signinMessage', 'Error en el password'));
    }


    done(null,user);
}));

export default passport;