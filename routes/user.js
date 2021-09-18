const express = require('express');
const router = express.Router();

const userController = require('../controllers/user'); 

router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin)

router.get('/sign-up', userController.getSignUp) 
router.post('/sign-up', userController.postSignUp)

router.post('/logout', userController.logout)

module.exports = router;  