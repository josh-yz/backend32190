const express = require('express');
const router = express.Router();


const routesProduct = require('./productRouter');
const routesMessege = require('./messageRouter');
const routesUser = require('./userRouter');



router.use('/producto', routesProduct);
router.use('/messege', routesMessege);
router.use('/usuario', routesUser);

module.exports = router;