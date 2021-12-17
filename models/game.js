const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const gameSchema = new Schema({

    // teams: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Team'
    //     }
    // ],
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
    
    time: {
        type: Date,
        required: true
    },
    stringTime:{
        type: String
    },
    result:{
        type: String
    }
})

module.exports = mongoose.model('Game', gameSchema)
