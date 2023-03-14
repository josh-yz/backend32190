const express = require('express');
const router = express.Router();

const {
    getMessage,
    getMessageId,
    postMessage,
    putMessage,
    deleteMessage
} = require('../controllers/messageController');

router.get('/',getMessage); 
router.get('/:id',getMessageId); 
router.post('/',postMessage); 
router.put('/:id',putMessage); 
router.delete('/:id',deleteMessage); 

module.exports = router;