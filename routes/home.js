const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/', homeController.getNew);
router.get('/new', homeController.getNew);
router.get('/old', homeController.getOld);
router.get('/liked', homeController.getLiked);
router.get('/inspired', homeController.getInspired);
router.get('/big', homeController.getBig);
router.get('/small', homeController.getSmall);
router.put('/addLike', homeController.addLike);
router.put('/addInspired', homeController.addInspired);

module.exports = router;
