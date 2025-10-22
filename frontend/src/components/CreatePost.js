import React, { useState } from 'react';
import { createPost, getToken } from '../services/api';
// import '../styles/CreatePost.css';


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


// import React, { useState } from 'react';
// import { createPost } from '../services/api';
// import '../styles/CreatePost.css';

// export default function CreatePost() {
//   const [form, setForm] = useState({ image: '', caption: '' });
//   const [msg, setMsg] = useState('');
//   const email = localStorage.getItem('email'); // user’s email (from login)

//   // convert image to base64
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => setForm({ ...form, image: reader.result });
//     if (file) reader.readAsDataURL(file);
//   };

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       setMsg('User not logged in');
//       return;
//     }
//     try {
//       const data = await createPost({ ...form, email });
//       setMsg(data.message || 'Post created successfully!');
//       setForm({ image: '', caption: '' });
//     } catch (err) {
//       setMsg(err.response?.data?.message || 'Failed to create post');
//     }
//   };

//   return (
//     <div className="createpost-container">
//       <h2>Create a Post</h2>
//       <form onSubmit={handleSubmit} className="createpost-form">
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//         {form.image && (
//           <img src={form.image} alt="Preview" className="createpost-preview" />
//         )}
//         <textarea
//           name="caption"
//           placeholder="Write your caption..."
//           value={form.caption}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Create Post</button>
//       </form>
//       {msg && <div className="createpost-msg">{msg}</div>}
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import '../styles/CreatePost.css';

// export default function CreatePost() {
//   const [post, setPost] = useState({ content: '', image: '' });

//   const handleChange = (e) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Post created:', post);
//     setPost({ content: '', image: '' });
//   };

//   return (
//     <div className="create-post">
//       <h2>Create a Post</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           name="content"
//           placeholder="What's on your mind?"
//           value={post.content}
//           onChange={handleChange}
//           required
//         ></textarea>
//         <input
//           type="text"
//           name="image"
//           placeholder="Image URL (optional)"
//           value={post.image}
//           onChange={handleChange}
//         />
//         <button type="submit">Post</button>
//       </form>
//     </div>
//   );
// }
