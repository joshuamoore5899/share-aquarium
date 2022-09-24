const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', homeController.getNew);
router.post('/filter', homeController.filterHome);
router.put('/addLike', homeController.addLike);
router.put('/saveAquarium', homeController.saveAquarium);

module.exports = router;
