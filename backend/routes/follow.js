const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Follow = require('../models/Follow');


router.post('/follow', auth, async (req, res) => {
  try {
    const { emailToFollow } = req.body;
    const followerId = req.user.userId;
    const userToFollow = await User.findOne({ email: emailToFollow });
    if (!userToFollow) return res.status(404).json({ message: 'User not found' });
    if (userToFollow._id.equals(followerId)) return res.status(400).json({ message: 'Cannot follow yourself' });

    const follow = new Follow({ follower: followerId, following: userToFollow._id });
    await follow.save();
    return res.json({ message: 'Followed' });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Already following' });
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.post('/unfollow', auth, async (req, res) => {
  try {
    const { emailToUnfollow } = req.body;
    const followerId = req.user.userId;
    const userToUnfollow = await User.findOne({ email: emailToUnfollow });
    if (!userToUnfollow) return res.status(404).json({ message: 'User not found' });

    await Follow.deleteOne({ follower: followerId, following: userToUnfollow._id });
    return res.json({ message: 'Unfollowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.get('/counts', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const followers = await Follow.countDocuments({ following: userId });
    const following = await Follow.countDocuments({ follower: userId });
    return res.json({ followers, following });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.get('/suggestions', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const followed = await Follow.find({ follower: userId }).select('following');
    const followedIds = followed.map(f => f.following);
    const suggestions = await User.find({ _id: { $nin: [userId, ...followedIds] } }).limit(6).select('username email');
    return res.json(suggestions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
module.exports = router;
