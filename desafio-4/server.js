const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

///export el router de producto///
const routesProduct = require('./products/productController');

const PORT = 8080;
const ROUTE = '/api/';


app.use(ROUTE,routesProduct);

app.listen(PORT,  () => {
    console.log(`Servidor en puerto :${PORT}${ROUTE}`);
});



/**
 * RUTAS :
 * GET   :http://localhost:8080/api/productos
 * GET   :http://localhost:8080/api/productos/3
 * POST  :http://localhost:8080/api/productos
   {
	"title": "producto prueba",
	"price": 6666,
	"thumbnail": "1_1000.jpg?t=1664308272842"
    }
 * PUT   :http://localhost:8080/api/productos/3
   {
	"title": "producto prueba",
	"price": 6666,
	"thumbnail": "1_1000.jpg?t=1664308272842"
    }
 * DELETE:http://localhost:8080/api/productos/3
 * **/