const express = require('express');
const app = express();
const router = express.Router();


///exportar la clase y la función numRandom///
const { Container, numRandom } = require('./products/contenedor');
const products = new Container('./products/product.txt')

const PORT = 8080;
const ROUTE = '/api/';



router.get('/productos', async (req, res) => {
    try {
        const arr = await products.getAll();
        if (arr.length == 0) {
            return res.status(204).json();
        }
        return res.status(200).json({ data: arr });
    } catch (error) {
        return res
            .status(409)
            .json({
                msg: "Error " + error,
            });
    }
});

router.get('/productoRandom', async (req, res) => {
    try {
        const id = numRandom(); // genera un id random 
        const product = await products.getById(id);
        const sw = typeof product === 'object'; // comprobar si es un object o un string
        if (!sw) {
            return res.status(202).json({msg : `${product},(id random:${id})`});
        }
        return res.status(200).json({ data: product });
    } catch (error) {
        return res
            .status(409)
            .json({
                msg: "Error " + error,
            });
    }
});


app.use(ROUTE,router);
app.listen(PORT,  () => {
    console.log(`Servidor en puerto :${PORT}${ROUTE}`);
});

/**
 * RUTAS :
 * http://localhost:8080/api/productos
 * http://localhost:8080/api/productoRandom
 * **/