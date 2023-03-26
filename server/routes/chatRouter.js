const router = require('express').Router();

const { clearChat, responseChat } = require('../controller/chat.controller');

router.get('/clear', clearChat);
router.post('/getAnswer', responseChat);

module.exports = router;
