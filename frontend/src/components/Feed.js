import React, { useEffect, useState } from 'react';
import { getPosts, getImageUrl } from '../services/api';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getPosts();
      setPosts(res || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {posts.length === 0 && <div>No posts yet</div>}
      {posts.map(p => (
        <div key={p._id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
          <div><strong>{p.email}</strong> <small style={{ color: '#666' }}>{new Date(p.createdAt).toLocaleString()}</small></div>
          <div style={{ marginTop: 8 }}>{p.caption}</div>
          <div style={{ marginTop: 8 }}>
            <img src={getImageUrl(p._id)} alt="post" style={{ maxWidth: '100%', maxHeight: 400 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

