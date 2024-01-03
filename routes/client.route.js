const express = require('express');
const { clientList, getClientList } = require('../controller/client.controller');
const router = express.Router();

router.post('/clientList', clientList).get('/getClientList', getClientList);

module.exports = router;
