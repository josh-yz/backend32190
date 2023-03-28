const productRepository = require('../repository/productRepository');


class ProductController{
    constructor (){
        this.productService = new productRepository()
    }

    async getProducto(req, res) {
        let productos = await this.productService.findAll();
        if (productos.length == 0) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: productos
            });
        }
    }

    async getProductoId(req, res) {
        const { id } = req.params;
        let productos = await this.productService.findByPk(id);
        if (!productos) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: productos
            });
        }
    }

    async postProducto(req, res) {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        let newProducto = await this.productService.create({ nombre, descripcion, codigo, foto, precio, stock })
        if (!newProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: newProducto
            });
        }
    }

    async putProducto(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        let upProducto = await this.productService.update(id, { nombre, descripcion, codigo, foto, precio, stock })
        if (!upProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: upProducto
            });
        }
    }

    async deleteProducto(req, res) {
        const { id } = req.params;
        let producto = await this.productService.delete(id)
        if (!producto) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: producto,
                msg: 'Registro eliminado'
            });
        }
    }
}

module.exports = ProductController;
