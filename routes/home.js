const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')


// ************* App ROUTES ************* //
router.get('/', mainController.homepage); // homepage route
router.get('/about', mainController.aboutpage); // about page route



module.exports = router;