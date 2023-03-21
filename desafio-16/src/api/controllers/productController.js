const { productService } = require('../services');


module.exports = {
    async getProducto(req, res) {
        let productos = await productService.findAll();
        if (productos.length == 0) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: productos
            });
        }
    },
    async getProductoId(req, res) {
        const { id } = req.params;
        let productos = await productService.findByPk(id);
        if (!productos) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: productos
            });
        }
    },
    async postProducto(req, res) {
        console.log();
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        let newProducto = await productService.create({ nombre, descripcion, codigo, foto, precio, stock })
        if (!newProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: newProducto
            });
        }
    },
    async putProducto(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        let upProducto = await productService.update(id, { nombre, descripcion, codigo, foto, precio, stock })
        if (!upProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: upProducto
            });
        }
    },
    async deleteProducto(req, res) {
        const { id } = req.params;
        let producto = await productService.delete(id)
        if (!producto) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: producto,
                msg: 'Registro eliminado'
            });
        }
    },
}