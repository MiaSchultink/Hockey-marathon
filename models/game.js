const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const gameSchema = new Schema({

    title: {
        type: String,
        default: "Hockey Marathon Game"
    },
    redTeam: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true

    },

    redScore: {
        type: Number,
        required: true,
        defualt: 0
    },
    blueScore: {
        type: Number,
        required: true,
        defualt: 0
    },
    blueTeam: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true

    },

    date: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    result: {
        type: String
    }
})

module.exports = mongoose.model('Game', gameSchema)
