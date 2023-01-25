const express = require('express');
const app = express();
const path = require('path')
const handlebars = require('express-handlebars')
const mongoBase = require('./db/mongodb/mongodb-connect')
const messageService = require('./message/messageService')

const authRouter = require('./auth/router')

const session = require('express-session')
const MongoStore = require('connect-mongo')

const passport = require('passport');
const flash = require('connect-flash');



const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');
require('./passport/local-auth');


app.use(flash());
app.use(passport.initialize());

app.use(
    session({
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://joshua:0ksRGFwgJfMPHa4P@coderhouse.y8y8lnq.mongodb.net/sesiones?retryWrites=true&w=majority',
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        ttl: 100,
      }),
      secret: 'auhsoj',
      resave: false,
      saveUninitialized: false,
    })
  )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(express.static(path.join(__dirname, 'views/handlebars')))
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views/handlebars'))
app.set('view engine', 'handlebars');

app.use('/api',authRouter);

app.get('/home', function (req, res) {
    if (!req.session.passport?.user?.email) {
        return res.redirect(302,'login');
    }

    res.render('./inicio.handlebars', { productos: [] });
});


app.get('/login', function (req, res) {
    res.render('./login.handlebars', { productos: [] });
});

app.get('/login', function (req, res) {
  res.render('./login.handlebars', { productos: [] });
});

app.get('/register', function (req, res) {
  res.render('./register.handlebars', { productos: [] });
});


app.get('/register-error', function (req, res) {
    res.render('./register-error.handlebars',);
});

app.get('/login-error', function (req, res) {
  res.render('./login-error.handlebars',);
});

app.get('/logout', function (req, res) {
  res.render('./logout.handlebars',);
});


app.get('/producto-test', function (req, res) {

    res.render('./producto.test.handlebars', { productos: [] });
});




const PORT = 8080;


server.listen(PORT, async () => {
    mongoBase.dbConnection();

    // const newM = await messageService.create({
    //     author: {

    //         nombre: `joshua `,
    //         email: 'josh_yz@hotmail.com',
    //         apellido: `barraza`,
    //         edad: 10,
    //         timestamp: new Date().toLocaleString(),
    //         alias: `josh`,
    //         avatar: `url `
    //     },
    //     text: 'hola !!'
    // });
    console.log(`Servidor en puerto http://localhost:${PORT}`);
});


/*
Rutas 
http://localhost:8080/
**/