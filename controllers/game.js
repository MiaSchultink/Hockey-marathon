const Team = require('../models/team');
const User = require('../models/user');
const Game = require('../models/game');
const Message = require('../models/message');
const { getIO } = require('../controllers/messages')


exports.getTeams = async (req, res, next) => {

    const teams = await Team.find().exec();
    const user = await User.findById(req.session.user._id).exec();

    try {
        res.render('teams', {
            teams: teams,
            user: user
        })
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }
}


exports.teamInfo = async (req, res, next) => {
    const team = await Team.findById(req.body.teamId).exec();

    try {
        res.render('team-info', {
            team: team
        })

    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }

}

exports.joinTeam = async (req, res, next) => {
    const team = await Team.findById(req.body.teamId).exec();
    const user = await User.findById(req.session.user._id).exec();
    try {
        if (team.members.includes(user._id)) {
            throw new Error('You are already on this team!')
        }
        else {
            await team.members.addToSet(user);
            user.team = team;
            await team.save();
            await user.save();
        }
        res.render('team-info', {
            team: team
        })
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }
}

exports.leaveTeam = async (req, res, next) => {
    const team = await Team.findById(req.body.teamId).exec();
    const user = await User.findById(req.session.user._id).exec();

    try {
        if (team.members.includes(user._id)) {
            await team.members.pull(user);
            user.team = null;
            await team.save();
        }
        else {
            throw new Error('You are not on this team so you cannot leave it!')
        }

        res.redirect('/');
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }
}



exports.getGames = async (req, res, next) => {
    const games = await Game.find()
        .populate("redTeam")
        .populate("blueTeam")
        .exec();
    const user = await User.findById(req.session.user._id).exec();

    try {
        res.render('games', {
            games: games,
            user: user
        })

    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }
}



// exports.getUpcomingGames = async (req, res, next) => {
//     const currentTime = new Date().getTime();
//     const closeTime = currentTime.addMinutes(-30).getTime();
//     const games = await Game.find().exec();

//     try {
//         const comingGames = [];
//         console.log(comingGames);
//         console.log("Hello")
//         for (let i = 0; i < games.length; i++) {
//             if (games[i].time <= closeTime) {
//                 comingGames.push(games[i]);


//             }
//         }


//         res.render('home', {
//             upcomingGames: comingGames
//         });
//     }
//     catch (err) {
//         console.log(err)
//         res.render('error', {
//             message: 'Something went wrong...'
//         })
//     }

// }






exports.getAnnouncements = async (req, res, next) => {
    // const socketIo = getIO()
    // console.log(socketIo)
    // socketIo.emit('update', 'Hello world')
    const messages =await  Message.find().populate('sender').exec();
    const user = await User.findById(req.session.user._id).exec();

    try{
        res.render('announcements', {
            messages: messages,
            user: user
           })
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }
    
}