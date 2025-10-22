import React, { useEffect, useState } from 'react';
import { getPosts, getImageUrl } from '../services/api';
// import '../styles/Feed.css';


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



// import React from 'react';
// import '../styles/Feed.css';

// export default function Feed() {
//   const posts = [
//     { id: 1, author: 'Guna', text: 'Just posted my first update!' },
//     { id: 2, author: 'Siri', text: 'What a great day 🌞' },
//   ];

//   return (
//     <div className="feed-container">
//       {posts.map((post) => (
//         <div key={post.id} className="feed-card">
//           <h4>{post.author}</h4>
//           <p>{post.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
