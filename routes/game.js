const express = require('express');
const router = express.Router();

const gameController  = require('../controllers/game')

router.get('/teams',gameController.getTeams);
router.post('/teams/team',gameController.teamInfo);

router.post('/teams/join', gameController.joinTeam);
router.post('/teams/leave',gameController.leaveTeam);
module.exports =router;
