const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../auth/user');

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(async (user, done) => {
    const userb = await User.findById(user.id);
    done(null, userb);
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({
        email: email,
    });
    if (user) {
        return done(null, false, req.flash('signupMessage', 'El email ya existe'))
    }
    const newuser = new User();
    newuser.email = email;
    newuser.password = newuser.encryptPassword(password)
    await newuser.save();
    done(null, newuser)
}));


passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({
        email: email,
    });

    if (!user) {
        return done(null, false, req.flash('signinMessage', 'El usuario no existe'))
    }
    if(!user.comparePassword(password)){
        return done(null,false,req.flash('signinMessage', 'Error en el password'));
    }

//     console.log('aqui');
//     req.session.user = {
//         name : email,
//         isLoggedIn: true
//     }

//    // req.session.save();
 
    // console.log(req.session,'sdds');

    done(null,user);
}));