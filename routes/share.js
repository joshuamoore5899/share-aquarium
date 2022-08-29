const express = require('express');
const router = express.Router();
const shareController = require('../controllers/share');

router.post('/shareAquarium', shareController.shareAquarium);

module.exports = router
