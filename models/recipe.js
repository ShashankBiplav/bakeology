const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  ingredients: [{ type: String }],
  categories: [{ type: String}],
  steps: [{ type: String }],
  chef:{
      //TODO: ADD chef id when chef auth and creation has been done
      // type: Schema.Types.ObjectId,
      // ref: 'Chef',
      type: String,
      required: true
  },
  complexity:{
      type: String,
      required: true
  },
  affordability:{
      type: String,
      required: true
  },
  isVegetarian:{
      type:Boolean
  }
},{
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
