
const Team = require('../models/team')
const User = require('../models/user')

const isAdmin = require('../middlewear/is-admin')

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
    try{
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
        if(isAdmin){
        const team = new Team({
            name: req.body.name,
            color: req.body.color,
        })
        await team.save();
        console.log(team)

        res.redirect('/')
    }
    else{
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