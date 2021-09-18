const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const gameSchema = new Schema({

    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }
    ],
    time:{
        type: Date,
    },
    result:{
        type: String
    }
})

module.exports = mongoose.model('Game', gameSchema)
