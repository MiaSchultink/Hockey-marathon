const User = require('../models/user')
const Team = require('../models/team')

const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const { getSystemErrorMap } = require('util');


sgMail.setApiKey(process.env.API_KEY)

exports.getSignUp = async (req, res, next) => {
    const teams = await Team.find().exec();
    try {
        res.render('sign-up', {
            teams:teams
        })
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Sign-up failed'
        })
    }
}

exports.postSignUp = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const team = req.body.team;
        
        const gradeLevel = req.body.gradeLevel;

        const tempUser = await User.findOne({ email: email }).exec();
        if (tempUser) {
            throw new Error('Sign-up failed')
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            team: team,
            gradeLevel: gradeLevel
        });

        await user.save();

        const message = {
            to: email,
            from: 'contact@miaschultink.com',
            subject: 'Sign-up Suceeded!',
            html: '<h1>You sucessfully signed up!</h1>'
        }
        sgMail.send(message)
        res.redirect('/user/login')
    }

    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Sign-up failed'
        })
    }
};


exports.getLogin = (req, res, next) => {
    try {
        res.render('login', {
            isLoggedIn: false
        })
    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Loggin failed'
        })
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email }).exec()

        if (!user) {
            res.redirect('/user/login')
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if (passwordMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.isAdmin = (user.role == 'admin');
            await req.session.save()
            res.redirect('/');
        }
        else {
            res.redirect('/user/login')
        }

    }
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Login failed'
        })
    }

};


exports.logout = (req, res, next) => {
    try{
       req.session.destroy();
       res.redirect('/user/login')
    }

    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }
};

exports.viewProfile = async(req, res, next) =>{
    const user = await User.findById(req.session.user._id).populate('team').exec();
   
    console.log(user.team);
    try{
    res.render('user-profile',{
        user:user
    })
}
    catch (err) {
        console.log(err)
        res.render('error', {
            message: 'Something went wrong...'
        })
    }
}






