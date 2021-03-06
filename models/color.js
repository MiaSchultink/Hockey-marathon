const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const colorSchema = new Schema({

    name: {
        type: String,
        required: true,
        defualt:"color"
    },
    score:{
        type:Number,
        required: true,
        default:0
    }
})

module.exports = mongoose.model('Color', colorSchema)
