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

router.get('/destination', mapController.getAll, mapController.isAuthenticated, (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page.')
    res.redirect('/auth/login')
  } else {
    res.render('destination')
  }
})

// router.get('/destination', mapController.getAll)
router.get('/destination/:id', mapController.getOne)
router.post('/destination/newTrip', mapController.createTrip)



module.exports = router;
