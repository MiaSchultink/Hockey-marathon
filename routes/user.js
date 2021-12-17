const express = require('express');
const router = express.Router();
const isAuth = require('../middlewear/is-auth')

const userController = require('../controllers/user'); 

router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin)

router.get('/sign-up', userController.getSignUp) 
router.post('/sign-up', userController.postSignUp)

router.post('/logout', isAuth, userController.logout)

router.get('/profile', isAuth, userController.viewProfile)

module.exports = router;  