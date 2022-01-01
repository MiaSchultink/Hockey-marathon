const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const messageSchema = new Schema({

    timeStamp:{
        type:String
    },
    content:{
     type:String
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
    
})

module.exports = mongoose.model('Message', messageSchema);
