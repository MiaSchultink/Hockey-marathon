const Team  = require('../models/team')

exports.getTeams = async (req, res, next) =>{

    const teams = await Team.find().exec();

    try{
    res.render('teams', {
        teams: teams
    })
}
catch (err) {
    console.log(err)
    res.render('error', {
        message: 'Something went wrong...'
    })
  }
}


