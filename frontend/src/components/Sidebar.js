import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { getFollowCounts, getSuggestions, followByEmail } from '../services/api';

export default function Sidebar({ user }) {
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const c = await getFollowCounts();
        setCounts(c);
        const s = await getSuggestions();
        setSuggest(s);
      } catch (err) { console.error(err); }
    })();
  }, [user]);

  const handleFollow = async (email) => {
    try {
      await followByEmail(email);
      const c = await getFollowCounts(); setCounts(c);
      const s = await getSuggestions(); setSuggest(s);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="sidebar">
      <div className="profile-card">
        <div className="avatar">{user?.email ? user.email[0].toUpperCase() : 'G'}</div>
        <div className="profile-info">
          <div className="profile-name">{user?.email || 'Guest'}</div>
          <div className="profile-role">Member</div>
        </div>
      </div>

      <div className="follow-stats">
        <div><strong>{counts.followers}</strong><div className="muted">Followers</div></div>
        <div><strong>{counts.following}</strong><div className="muted">Following</div></div>
      </div>

      <div className="suggestions">
        <h4>Who to follow</h4>
        {suggest.map(s => (
          <div key={s._id} className="suggest-row">
            <div>
              <div className="sname">{s.username || s.email}</div>
              <div className="smeta">{s.email}</div>
            </div>
            <button className="mini-btn" onClick={()=>handleFollow(s.email)}>Follow</button>
          </div>
        ))}
      </div>
    </aside>
  );
}

