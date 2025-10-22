const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true }, // foreign key (user email)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: {
    data: Buffer,
    contentType: String
  },
  caption: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);

