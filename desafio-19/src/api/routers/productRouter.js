import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

class ProductRouter {
constructor() {
this.productController = new ProductController();
this.init();
}

async init() {
router.get('/', async (req, res) => await this.productController.getProducto(req, res));
router.get('/:id', async (req, res) => await this.productController.getProductoId(req, res));
router.post('/', async (req, res) => this.productController.postProducto(req, res));
router.put('/:id', (req, res) => this.productController.putProducto(req, res));
router.delete('/:id', (req, res) => this.productController.deleteProducto(req, res));
}

getRouter() {
return router;
}
}

export default ProductRouter;