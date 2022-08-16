const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aquariumSchema = new Schema({
  name: String,
  waterType: String,
  tankSize: Number,
  description: String,
  fish: Array,
  likes: Number,
  inspired: Number,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Aquarium', aquariumSchema);
