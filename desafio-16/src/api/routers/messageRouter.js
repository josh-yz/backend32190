const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController')

class MessageRouter {
  constructor() {
    this.messageController = new messageController();
    this.init();
  }

  async init() {
    router.get('/', async (req, res) =>  await this.messageController.getMessage(req, res));
    router.get('/:id', async (req, res) => await this.messageController.getMessage(req, res))
    router.post('/', async (req, res) => this.messageController.postMessage(req, res) );
    router.put('/:id', (req, res) => this.messageController.putMessage(req, res)); 
    router.delete('/:id', (req, res) => this.messageController.deleteMessage(req, res));
  }

  getRouter() {
    return router;
  }
}

module.exports = MessageRouter;



// const express = require('express');
// const router = express.Router();

// const {
//     getMessage,
//     getMessageId,
//     postMessage,
//     putMessage,
//     deleteMessage
// } = require('../controllers/messageController');

// router.get('/',getMessage); 
// router.get('/:id',getMessageId); 
// router.post('/',postMessage); 
// router.put('/:id',putMessage); 
// router.delete('/:id',deleteMessage); 

// module.exports = router;