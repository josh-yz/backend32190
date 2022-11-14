const express = require('express');
const router = express.Router();

const { Container } = require('./contenedor');
const products = new Container('./products/product.txt')

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
        return res.status(200).json({ data: producto });
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