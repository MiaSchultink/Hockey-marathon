
const Team = require('../models/team')
const User = require('../models/user')
const Game = require('../models/game')

const isAdmin = require('../middlewear/is-admin');
const { Mongoose } = require('mongoose');

async function checkAdmin() {
    let isAdmin;

    const user = await User.findById(req.session.user._id).exec();
    if (user.role == "admin") {
        isAdmin = true;
    }
    else {
        isAdmin = false;
    }
    return isAdmin;
}



exports.getAddTeam = (req, res, next) => {
    try {
        res.render('addTeam')
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }
}

exports.addTeam = async (req, res, next) => {
    try {
        if (isAdmin) {
            const team = new Team({
                name: req.body.name,
                color: req.body.color,
            })
            await team.save();
            console.log(team)

            res.redirect('/')
        }
        else {
            throw new Error('You do not have permission to preform this action')
        }

    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }

}

exports.getScheduelGame = async (req, res, next) => {
    const teams = await Team.find().exec();

    const blueTeams = await Team.find({ color: 'blue' }).exec();
    const redTeams = await Team.find({ color: 'red' }).exec();
    try {
        res.render('scheduel-game', {
            redTeams: redTeams,
            blueTeams: blueTeams
        })
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }

}

exports.scheduelGame = async (req, res, next) => {


    const date = new Date();
    date.setFullYear(2021, 11, 29);

    const time = req.body.gameTime;
    const brokenTime = time.split(":")
    const hour = brokenTime[0];
    const minute = brokenTime[1];

    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);

    try {
        const game = new Game({
            redTeam: req.body.redTeam,
            blueTeam: req.body.blueTeam,
            time: date,
            stringTime: time,
            result: 'Undetermined'

        });
        // console.log(game)

        const blueTeam = await Team.findById(req.body.blueTeam).exec();
        const redTeam = await Team.findById(req.body.redTeam).exec();
        blueTeam.games.addToSet(game._id);
        redTeam.games.addToSet(game._id);


        await game.save();
        await redTeam.save();
        await blueTeam.save();

        res.redirect('/');
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }

}

exports.gamesAdminView = async (req, res, next) => {
    const games = await Game.find().exec();

    res.redner('games-admin-view', {
        games: games
    })
}

exports.deleteGame = async (req, res, next) => {
    const game = await Game.findById(req.body.gameId).exec();
    const teams = await Team.find().exec();

    try {

        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];

            for (let j = 0; j < team.games.length; j++) {
                const currentGame = team.games[j];

                if (currentGame._id.toString() == game._id.toString()) {
                    team.games.pull(currentGame._id);
                    await team.save();
                }
            }
        }

        await game.remove();

        res.redirect('/game/all')

    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }

}

exports.editUser = async (req, res, next) =>{
    const user = await User.findById(req.body.user._id).exec();
    


}

exports.createUser = (req, res, next) =>{
    
}






