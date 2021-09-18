const express = require('express');
const router = express.Router();

const gameController  = require('../controllers/game')

router.get('/teams',gameController.getTeams);

module.exports =router;