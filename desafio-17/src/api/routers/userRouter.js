const express = require('express');
const router = express.Router();

const {
    getUser,
    getUserId,
    deleteUser
} = require('../controllers/userController');

router.get('/', getUser);
router.get('/:id', getUserId);
router.delete('/:id', deleteUser);

module.exports = router;