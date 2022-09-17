const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require('../controllers/auth');
const dashboardController = require('../controllers/dashboard');
const { ensureAuth, ensureGuest } = require('../middleware/auth');


router.get('/', ensureAuth, dashboardController.getDashboard);
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get("/logout", authController.logout);
router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);
router.post('/shareAquarium', ensureAuth, upload.array('files', 20), dashboardController.shareAquarium);
router.delete('/deleteAquarium/:id', dashboardController.deleteAquarium);
router.put('/editAquarium/:id', dashboardController.editAquarium);

module.exports = router
