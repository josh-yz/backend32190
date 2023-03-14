const express = require('express');
const router = express.Router();

const {
    getProducto,
    getProductoId,
    postProducto,
    putProducto,
    deleteProducto
} = require('../controllers/productController');

router.get('/',getProducto); 
router.get('/:id',getProductoId); 
router.post('/',postProducto); 
router.put('/:id',putProducto); 
router.delete('/:id',deleteProducto); 

module.exports = router;