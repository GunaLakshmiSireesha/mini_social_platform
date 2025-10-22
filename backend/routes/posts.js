const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');


const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } }); // 8MB limit


router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const post = new Post({
      email,
      userId: user._id,
      caption: caption || ''
    });

    if (req.file) {
      post.image.data = req.file.buffer;
      post.image.contentType = req.file.mimetype;
    }

    await post.save();
    return res.status(201).json({ message: 'Post created', postId: post._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const filter = {};
    if (email) filter.email = email;
    const posts = await Post.find(filter).sort({ createdAt: -1 }).limit(100).select('-image.data');
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.get('/:id/image', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select('image');
    if (!post || !post.image || !post.image.data) return res.status(404).json({ message: 'Image not found' });
    res.set('Content-Type', post.image.contentType || 'image/jpeg');
    return res.send(post.image.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
