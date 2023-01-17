const express = require('express');
const app = express();
const path = require('path')
const handlebars = require('express-handlebars')
const mongodb = require('./db/mongodb/mongodb-connect')
const messageService = require('./message/messageService')

const { normalize, denormalize, schema } = require('normalizr')

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'views/handlebars')))
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views/handlebars'))
app.set('view engine', 'handlebars');



app.get('/', function (req, res) {
    res.render('./inicio.handlebars', { productos: [] });
});

app.get('/producto-test', function (req, res) {
    res.render('./producto.test.handlebars', { productos: [] });
});


const PORT = 8080;


server.listen(PORT, async () => {
    mongodb.dbConnection();

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