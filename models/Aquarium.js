const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aquariumSchema = new Schema({
  name: String,
  waterType: String,
  tankSize: Number,
  trueSize: Number,
  measurementType: String,
  images: Buffer,
  description: String,
  fish: Array,
  likes: Number,
  liked: Array,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model('Aquarium', aquariumSchema);
