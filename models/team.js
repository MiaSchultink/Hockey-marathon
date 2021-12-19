const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const teamSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:[]
        }
    ],

    color: {
        type: String,
        required: true
    },
    games: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Game',
            defualt: []
        }
    ],
    score:{
        type: Number
    }
})

module.exports = mongoose.model('Team', teamSchema);