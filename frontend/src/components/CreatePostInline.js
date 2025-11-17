import React, { useState } from 'react';
import { createPost } from '../services/api';
import '../styles/CreatePost.css';

export default function CreatePostInline({ onPosted }) {

  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [msg, setMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFile = (e) => setFile(e.target.files[0]);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) { setMsg('Choose an image'); return; }

    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('caption', caption);

      await createPost(fd);

      setCaption('');
      setFile(null);
      setMsg('Posted Successfully!');

      if (onPosted) onPosted();

      setTimeout(() => {
        setMsg('');
        setShowModal(false);
      }, 800);
    } catch (err) {
      setMsg('Error posting');
    }
  };

  return (
    <div>
      <button className="create-post-main-btn" onClick={() => setShowModal(true)}>
        + Create Post
      </button>

      {showModal && (
        <div className="popup-overlay" onClick={() => setShowModal(false)}>
          
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Post</h2>

            <form onSubmit={submit}>
              
              <label className="file-label">
                Choose Image
                <input type="file" accept="image/*" onChange={handleFile} />
              </label>

              {file && <p className="file-name">File: {file.name}</p>}

              <textarea
                className="caption-box"
                placeholder="Add caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />

              <button type="submit" className="post-btn">
                Add Post
              </button>

              {msg && <p className="msg-info">{msg}</p>}
            </form>

            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
