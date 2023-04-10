import express from 'express';
import MessageController from '../controllers/messageController.js';

const router = express.Router();

class MessageRouter {
constructor() {
this.messageController = new MessageController();
this.init();
}

async init() {
router.get('/', async (req, res) => await this.messageController.getMessage(req, res));
router.get('/:id', async (req, res) => await this.messageController.getMessage(req, res));
router.post('/', async (req, res) => this.messageController.postMessage(req, res));
router.put('/:id', (req, res) => this.messageController.putMessage(req, res));
router.delete('/:id', (req, res) => this.messageController.deleteMessage(req, res));
}

getRouter() {
return router;
}
}

export default MessageRouter;