const express = require('express');
const session = require('express-session');
const passport = require('passport');

const router = express.Router();

/**
 * Controllers, configs
 */
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const mapController = require('../controllers/mapController');

router.get('/', homeController.index);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);
router.get('/forgot', userController.getForgot);
router.post('/forgot', userController.postForgot);
router.get('/reset/:token', userController.getReset);
router.post('/reset/:token', userController.postReset);
router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/destination', mapController.getMap);


module.exports = router;
