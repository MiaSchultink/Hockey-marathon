const Team  = require('../models/team');
const User  = require('../models/user');

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
exports.teamInfo = async (req, res, next) =>{
 const team = await Team.findById(req.body.teamId).exec();

try{
    res.render('team-info',{
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

exports.joinTeam = async(req, res, next)=>{
    const team = await Team.findById(req.body.teamId).exec();
    const user = await User.findById(req.session.user._id).exec();
try{
    if(team.members.includes(user._id)){
        throw new Error('You are already on this team!')
    }
    else{
        await team.members.addToSet(user);
        user.team = team;
        await team.save();
    }
    res.render('team-info', {
        team:team
    })
}
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
      }
}

exports.leaveTeam = async (req, res, next) =>{
    const team = await Team.findById(req.body.teamId).exec();
    const user = await User.findById(req.session.user._id).exec();

try{
    if(team.members.includes(user._id)){
       await team.members.pull(user);
       user.team = null; 
       await team.save();
    }
    else{
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



