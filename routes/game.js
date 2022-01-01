const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewear/is-admin') 

const isAuth = require('../middlewear/is-auth')

const gameController  = require('../controllers/game')

router.get('/teams',isAuth, gameController.getTeams);
router.post('/teams/team',isAuth, gameController.teamInfo);

router.post('/teams/join',isAuth, gameController.joinTeam);
router.post('/teams/leave',isAuth, gameController.leaveTeam);

router.get('/all', isAuth, gameController.getGames);

router.get('/announcements', isAuth, gameController.getAnnouncements);

module.exports =router;
