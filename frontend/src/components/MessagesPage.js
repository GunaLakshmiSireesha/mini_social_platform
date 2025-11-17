import React, { useEffect, useState, useRef } from 'react';
import { getConversation } from '../services/api';
import io from 'socket.io-client';
import '../styles/Messages.css';

const SOCKET_URL = 'http://localhost:5000'; 

export default function MessagesPage({ user }) {
  const [selectedEmail, setSelectedEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    
    socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });
  
    if (user?.userId) socketRef.current.emit('join', user.userId);

    socketRef.current.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => { socketRef.current?.disconnect(); };
  }, [user]);

  const loadConversation = async (email) => {
    setSelectedEmail(email);
    const conv = await getConversation(email);
    setMessages(conv);
  };

  const send = () => {
    if (!text || !selectedEmail) return;
    const toEmail = selectedEmail;
    fetch(`http://localhost:5000/api/auth/lookup?email=${encodeURIComponent(toEmail)}`)
      .then(r => r.json())
      .then(async (data) => {
        const toId = data.userId;
        if (!toId) return alert('Recipient not found (server must support lookup)');
        const payload = { fromId: user.userId, toId, text };
        socketRef.current.emit('send_message', payload);
        setText('');
      }).catch(err => {
        alert('Recipient lookup failed. Backend must support /api/auth/lookup for messages to send by email.');
      });
  };

  return (
    <div className="messages-page">
      <div className="conversations-list">
        <h4>Conversations</h4>
        <div className="conv-item" onClick={()=>loadConversation('gunalaxmisireesha@gmail.com')}>gunalaxmisireesha@gmail.com</div>
        <div className="conv-item" onClick={()=>loadConversation('suryakala.k@gmail.com')}>suryakala.k@gmail.com</div>
        <div className="conv-item" onClick={()=>loadConversation('laxmi522@gmail.com')}>laxmi522@gmail.com</div>
        <div className="conv-item" onClick={()=>loadConversation('satya1705@gmail.com')}>satya1705@gmail.com</div>
      </div>


      <div className="chat-window">
        <div className="chat-top">{selectedEmail || 'Select a conversation'}</div>
        <div className="chat-body">
          {messages.map((m, idx) => (
            <div key={idx} className={m.from === user.userId ? 'bubble mine' : 'bubble'}>
              <div>{m.text}</div>
              <small>{new Date(m.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message..." />
          <button onClick={send} className="primary-btn">Send</button>
        </div>
      </div>
    </div>
  );
}


