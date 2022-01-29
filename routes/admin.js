const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewear/is-admin') 

const adminController  = require('../controllers/admin')

router.get('/add-team', isAdmin, adminController.getAddTeam)
router.post('/add-team', isAdmin, adminController.addTeam)
router.post('/reset-score', isAdmin, adminController.resetTeamScore);

router.get('/game/new', isAdmin, adminController.getScheduelGame);
router.post('/game/new', isAdmin, adminController.scheduelGame);
router.post('/game/delete',  isAdmin, adminController.deleteGame);
router.get('/edit-game', isAdmin, adminController.getEditGame);
router.get('/track-game/:gameId', isAdmin, adminController.getTrackGame);
router.post('/track-game', isAdmin, adminController.trackGame);

router.get('/color/new', isAdmin, adminController.getCreateNewColor);
router.post('/color/new', isAdmin, adminController.createNewColor);

router.get('/announcements/new', isAdmin, adminController.getBroadcastForm);

router.post('/announcements/new', isAdmin, adminController.broadcastMessage);

router.post('/announcements/delete', isAdmin, adminController.deleteMessage);




module.exports = router;  
