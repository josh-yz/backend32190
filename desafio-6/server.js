const express = require('express');
const app = express();
const path = require('path')
const handlebars = require('express-handlebars')

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'views/handlebars')))
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views/handlebars'))
app.set('view engine', 'handlebars');



app.get('/', function(req, res) {
    res.render('./inicio.handlebars',{productos :[]});
});


const PORT = 8080;


server.listen(PORT, () => {
    console.log(`Servidor en puerto http://localhost:${PORT}`);
});


/*
Rutas 
http://localhost:8080/
**/