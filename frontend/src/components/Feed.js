import React, { useEffect, useState } from 'react';
import { getPosts, getImageUrl } from '../services/api';
import '../styles/Feed.css';
import CreatePostInline from './CreatePostInline';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await getPosts();
      setPosts(data || []);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="feed-container">
      <div className="create-inline-wrap">
        <CreatePostInline onPosted={load} />
      </div>

      <h2 className="feed-title">Feeds</h2>

      <div className="feed-cards">
        {posts.map((p) => (
          <article className="post-card" key={p._id}>
            <div className="post-header">
              <div className="avatar">
                {p.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="post-user">
                <div className="post-author">{p.email}</div>
                <div className="post-time">
                  {new Date(p.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            {p._id && (
              <img
                className="post-image"
                src={getImageUrl(p._id)}
                alt="post"
              />
            )}

            <div className="post-caption">{p.caption}</div>

            <div className="post-actions">
              <button className="like-btn">❤️ Like</button>
              <button className="comment-btn">💬 Comment</button>
              <button className="share-btn">🔁 Share</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
