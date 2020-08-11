const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title:{
        type: String,
        required: true
    },
    recipes:[{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    colorA:{
        type: String,
        required: true
    },
    colorB:{
        type: String,
        required: true
    },
    iconImageUrl:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);