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
    }]
});

module.exports = mongoose.model('Category', categorySchema);