const express = require('express');
// const router = express.Router();


// const routesProduct = require('./productRouter');
// const routesMessege = require('./messageRouter');
// const routesUser = require('./userRouter');



// router.use('/producto', routesProduct);
// router.use('/messege', routesMessege);
// router.use('/usuario', routesUser);

// module.exports = router;

const router = express.Router();
const routesProduct = require('./productRouter');
const routesMessage = require('./messageRouter');
const routesUser = require('./userRouter');


class MainRouter {
  constructor() {
    this.routesProduct = new routesProduct();
    this.routesMessage = new routesMessage();
    this.init();
  }

  init() {
    router.use('/producto',this.routesProduct.getRouter());
    router.use('/message',this.routesMessage.getRouter());
    router.use('/usuario', routesUser);
  }

  getRouter() {
    return router;
  }
}

module.exports = MainRouter;