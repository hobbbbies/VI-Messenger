const express = require("express");
const router = express.Router();
const getToken = require('../middleware/getToken');
const verifyToken = require('../middleware/verifyToken');
const messageController = require('../controllers/messageController');
const contactController = require('../controllers/contactController');

// Contact management routes
router.get('/', getToken, verifyToken, contactController.getContacts);
router.post('/', getToken, verifyToken, contactController.addContact);
router.delete('/', getToken, verifyToken, contactController.removeContact);

// Message routes
router.get('/messages', getToken, verifyToken, messageController.getAllMessages);
router.post('/messages', getToken, verifyToken, messageController.createMessage);

module.exports = router;    