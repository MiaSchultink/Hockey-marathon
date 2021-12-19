
const Team = require('../models/team')
const User = require('../models/user')
const Game = require('../models/game')
// const BlueColor = require('../models/blue');
// const RedColor = require('../models/red');
const Color = require('../models/color')

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
   const stringTime = req.body.gameTime;
    let time = stringTime;
    // const brokenTime = time.split(":")
    // let hour =parseInt(brokenTime[0]);
    // hour+=2;
    
    // if(hour<10){
    //     hour = hour.toString();
    //     hour = 0+hour;
    // }
    
    // time = hour+":"+brokenTime[1];

    const date = new Date(req.body.gameDate+"T"+stringTime);
    console.log(date);
    console.log(stringTime);
   // const milDate = date.getTime();
    //console.log("mil ", milDate);
    try {
        const game = new Game({
            redTeam: req.body.redTeam,
            blueTeam: req.body.blueTeam,
            date: date,
            time: stringTime,
            result: 'Undetermined'

        });
         console.log(game)

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

exports.getEditGame = async (req, res, next) =>{
    const blueTeams = await Team.find({ color: 'blue' }).exec();
    const redTeams = await Team.find({ color: 'red' }).exec();
    try {
        res.render('edit-game', {
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
exports.editGame =async(req, res, next) =>{
const game = await Game.findById(req.body.gameId).exec();

try{
game.title = req.body.title;
game.blueTeam = req.body.blueTeam;
game.redTeam = req.body.redTeam;
game.date = req.body.date;
game.time = req.body.time;
game.result = req.body.result;


await game.save();
}
catch (err) {
    console.log(err)
    res.render('error', {
        message: 'Something went wrong...'
    })
}

}


exports.getTrackGame = async (req, res, next) =>{
    const game = await Game.findById(req.params.gameId).exec();
    
    const redTeam = await Team.findById(game.redTeam).exec();
    const blueTeam = await Team.findById(game.blueTeam).exec();

    
    try{
      res.render('track-game.ejs',{
          game: game,
          redTeam: redTeam,
          blueTeam: blueTeam
      })
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }
}

exports.trackGame =async (req, res, next) =>{
    const game = await Game.findById(req.body.gameId).exec();
    const redTeam = await Team.findById(game.redTeam).exec();
    const blueTeam = await Team.findById(game.blueTeam).exec();
    
    redTeam.score = req.body.redScore;
    blueTeam.score= req.body.blueScore;



}


exports.editUser = async (req, res, next) => {
    const user = await User.findById(req.body.user._id).exec();



}

exports.createUser = (req, res, next) => {

}






