const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', homeController.getNew);
router.post('/filter', homeController.filterHome);
router.get('/new', homeController.getNew);
router.get('/old', homeController.getOld);
router.get('/liked', homeController.getLiked);
router.get('/big', homeController.getBig);
router.get('/small', homeController.getSmall);
router.put('/addLike', homeController.addLike);

module.exports = router;
