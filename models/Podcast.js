// models/Podcast.js
const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  audioUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  ratings: [{ type: Number }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Podcast', PodcastSchema);
