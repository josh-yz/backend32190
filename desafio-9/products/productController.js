const express = require('express');
const router = express.Router();

const { Container } = require('./contenedor');
const products = new Container('./products/product.txt')

const engine = (url) => {
    const v = url.split('/')[1];

    switch (v) {
        case 'pug':
            return 'pug/formulario.pug';
        case 'ejs':
            return 'ejs/inicio';
        case 'hbs':
            return 'inicio.handlebars';

    }


}

const uri = (url) => url.split('/')[1];

router.get('/', async (req, res) => {

    // console.log(engine(req.originalUrl) );

    try {
        const arr = await products.getAll();
        if (arr.length == 0) {
            return res.status(204).json();
        }

        //return res.render('pug/inicio',{productos:  arr});
        //return res.render('pug/formulario.pug',{productos:  arr});
        return res.render('inicio' , { productos: arr });


    } catch (error) {
        return res
            .status(409)
            .json({
                msg: "Error " + error,
            });
    }
});

router.get('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const arr = await products.getById(id);
        if (!arr) {
            return res.status(200).json({ error: 'producto no encontrado' });
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

router.post('/productos', async (req, res) => {
    try {
        const { title, price, thumbnail } = req.body;

        const producto = await products.save({ title, price, thumbnail });

        if (!producto) {
            return res.status(200).json({ error: 'Error al guardar producto ' });
        }
        return res.redirect(`/${uri(req.originalUrl)}/productos`);
    } catch (error) {
        return res
            .status(409)
            .json({
                msg: "Error " + error,
            });
    }
});

router.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        const producto = await products.update({ title, price, thumbnail, id });
        if (!producto) {
            return res.status(200).json({ error: 'producto no encontrado' });
        }
        return res.status(200).json({ data: producto });
    } catch (error) {
        return res
            .status(409)
            .json({
                msg: "Error " + error,
            });
    }
});


router.delete('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await products.deleteById(id);
        if (!producto) {
            return res.status(200).json({ error: 'producto no encontrado' });
        }
        return res.status(200).json({ data: `Se elimino :${producto},con la id:${id}` });
    } catch (error) {
        return res
            .status(409)
            .json({
                msg: "Error " + error,
            });
    }
});



module.exports = router