require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const followRoutes = require('./routes/follow');
const messageRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;


const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET','POST']
  }
});


io.on('connection', (socket) => {
  
  socket.on('join', (userId) => {
    socket.join(userId);
  });

 
  socket.on('send_message', async (payload) => {
    try {
     
      const Message = require('./models/Message');
      const msg = new Message({
        from: payload.fromId,
        to: payload.toId,
        text: payload.text
      });
      await msg.save();

     
      io.to(payload.toId).emit('receive_message', msg);
      io.to(payload.fromId).emit('receive_message', msg);
    } catch (err) {
      console.error('socket send_message error', err);
    }
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
