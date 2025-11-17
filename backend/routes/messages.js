const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Message = require('../models/Message');

router.get('/conversation/:email', auth, async (req, res) => {
  try {
    const myId = req.user.userId;
    const other = await User.findOne({ email: req.params.email });
    if (!other) return res.status(404).json({ message: 'User not found' });

    const messages = await Message.find({
      $or: [
        { from: myId, to: other._id },
        { from: other._id, to: myId }
      ]
    }).sort({ createdAt: 1 });

    return res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
