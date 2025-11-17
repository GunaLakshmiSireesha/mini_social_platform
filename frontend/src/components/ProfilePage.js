import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '../services/api';
import '../styles/Profile.css';

export default function ProfilePage(){
  const { email } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const all = await getPosts();
      setPosts(all.filter(p => p.email === email));
    })();
  }, [email]);

  return (
    <div style={{ maxWidth: 100, margin: '20px auto' }}>
      <h2>Profile: {email}</h2>
      <div className="profile-grid">
        {posts.map(p => (
          <div className="profile-post" key={p._id}>
            <img src={`http://localhost:5000/api/posts/${p._id}/image`} alt="post" />
            <div>{p.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
