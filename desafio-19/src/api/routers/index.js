import express from 'express';
import ProductRouter from './productRouter.js';
import MessageRouter from './messageRouter.js';
import userRouter from './userRouter.js';

const router = express.Router();

class MainRouter {
constructor() {
this.routesProduct = new ProductRouter();
this.routesMessage = new MessageRouter();
this.init();
}

init() {
router.use('/producto', this.routesProduct.getRouter());
router.use('/message', this.routesMessage.getRouter());
router.use('/usuario', userRouter);
}

getRouter() {
return router;
}
}

export default MainRouter;