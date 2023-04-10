const productRepository = require('../api/repository/productRepository');


class ProductController {
    constructor() {
        this.productService = new productRepository()
    }

    async getAllProducts() {
        let productos = await this.productService.findAll();
        return productos;
    }

    async getProductById(id) {
        let producto = await this.productService.findByPk(id);
        return producto
    }

    async addProduct(body) {
        const { nombre, descripcion, codigo, foto, precio, stock } = body;
        let newProducto = await this.productService.create({ nombre, descripcion, codigo, foto, precio, stock })
        return newProducto
    }

    async updateProductById(id, body) {
        const { nombre, descripcion, codigo, foto, precio, stock } = body;
        let upProducto = await this.productService.update(id, { nombre, descripcion, codigo, foto, precio, stock })
        return upProducto
    }

    async deleteProductById(id) {
        let producto = await this.productService.delete(id)
        return producto
    }
}



const rootValueFn = () => {
    const productController = new ProductController();

    return {
        getAllProducts: async () => {
            return await productController.getAllProducts()
        },
        getProductById: async ({ id }) => {
            return await productController.getProductById(id)
        },
        addProduct: async ({ data }) => {

            return await productController.addProduct(data)
        },
        updateProductById: async ({ id  ,data}) => {
            return await productController.updateProductById(id, data);
        },
        deleteProductById: async ({ id }) => {
            console.log(id);
            return await productController.deleteProductById(id)
        }
    }

}

module.exports = rootValueFn

