const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewear/is-admin') 

const adminController  = require('../controllers/admin')

router.get('/add-team', isAdmin, adminController.getAddTeam)
router.post('/add-team', isAdmin, adminController.addTeam)

router.get('/game/new', isAdmin, adminController.getScheduelGame);
router.post('/game/new', isAdmin, adminController.scheduelGame);
router.post('/game/delete',  isAdmin, adminController.deleteGame);
router.get('/edit-game', isAdmin, adminController.getEditGame);
router.get('/track-game/:gameId', isAdmin, adminController.getTrackGame);

module.exports = router;  
