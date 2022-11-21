const express = require('express');
const app = express();

const handlebars = require('express-handlebars')
const path = require('path')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));







//"TIENE QUE QUITAR LOS COMENTARIO PARA QUE FUNCIONE handlebars"

// app.engine('handlebars', handlebars.engine())
// app.set('views', './views/handlebars')
// app.set('view engine', 'handlebars');


app.set('view engine', 'pug');
app.set('view engine', 'ejs');




///export el router de producto///
const routesProduct = require('./products/productController');

const PORT = 8080;
const ROUTE = '/api/';


app.use('/hbs/',routesProduct);
app.use('/ejs/',routesProduct);
app.use('/pug/',routesProduct);

app.listen(PORT, () => {
    console.log(`Servidor en puerto :${PORT}${ROUTE}`);
});


/*
Rutas 
http://localhost:8080/hbs/productos
http://localhost:8080/ejs/productos
http://localhost:8080/pug/productos
**/