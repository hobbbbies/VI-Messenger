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
router.get('/pending', getToken, verifyToken, contactController.getPending);
router.delete('/pending', getToken, verifyToken, contactController.removeContactPending);

// Message routes
router.get('/:contactId/messages', getToken, verifyToken, messageController.getAllMessages);
router.post('/messages', getToken, verifyToken, messageController.createMessage);
router.delete('/messages', getToken, verifyToken, messageController.deleteMessage);
router.put('/messages', getToken, verifyToken, messageController.updateMessage)
module.exports = router;    