const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewear/is-admin') 

const adminController  = require('../controllers/admin')

router.get('/add-team', isAdmin, adminController.getAddTeam)
router.post('/add-team', isAdmin, adminController.addTeam)

module.exports = router;  
