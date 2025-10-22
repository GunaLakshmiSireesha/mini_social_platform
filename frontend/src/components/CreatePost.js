import React, { useState } from 'react';
import { createPost, getToken } from '../services/api';

export default function CreatePost({ user, onCreated }) {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setMsg('Please select an image'); return; }
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('caption', caption);
      const res = await createPost(fd);
      if (res.postId) {
        setMsg('Post created');
        setCaption('');
        setFile(null);
        if (onCreated) onCreated();
      } else {
        setMsg(res.message || 'Error creating post');
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Network error');
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <form onSubmit={handleSubmit}>
        <div><label>Email (logged in)</label></div>
        <div><input value={user?.email || ''} disabled style={{ width: '100%', marginBottom: 8 }} /></div>
        <div><input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} /></div>
        <div><input placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} style={{ width: '100%', marginTop: 8 }} /></div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Create Post</button>
        </div>
      </form>
      <div style={{ color: 'green', marginTop: 8 }}>{msg}</div>
    </div>
  );
}
  
