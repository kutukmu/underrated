const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
  },

  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
});

SongSchema.index({
  "$**": "text",
});

module.exports = mongoose.model("Song", SongSchema);
