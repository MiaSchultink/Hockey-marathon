const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,

    role: {
        type: String,
        required: true,
        default: 'user'
    },
 

    team:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        default: null,
        ref: 'Team'
    },
    gradeLevel:{
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);