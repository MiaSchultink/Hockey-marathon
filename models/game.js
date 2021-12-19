const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const gameSchema = new Schema({

    // teams: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Team'
    //     }
    // ],
    title:{
        type: String,
        default:"Hockey Marathon Game"
    },
    redTeam: {
        
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true 
        
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
    time:{
        type: String
    },
    result:{
        type: String
    }
})

module.exports = mongoose.model('Game', gameSchema)
