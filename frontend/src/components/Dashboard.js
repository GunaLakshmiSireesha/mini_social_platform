import React, { useState } from 'react';
import CreatePost from './CreatePost';
import Feed from './Feed';
// import '../styles/Dashboard.css';

export default function Dashboard({ user }) {
  const [showCreate, setShowCreate] = useState(true);

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ width: 260, border: '1px solid #ddd', padding: 12 }}>
        <h3>Dashboard</h3>
        <div><strong>{user?.email}</strong></div>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => setShowCreate(true)} style={{ display: 'block', marginBottom: 8 }}>Create Post</button>
        </div>
        {showCreate && <CreatePost user={user} onCreated={() => setShowCreate(false)} />}
      </div>

      <div style={{ flex: 1 }}>
        <h3>Feed</h3>
        <Feed />
      </div>
    </div>
  );
}


// import React from 'react';
// import '../styles/Dashboard.css';

// export default function Dashboard() {
//   const user = JSON.parse(localStorage.getItem('user')) || { username: 'User' };
//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, {user.username}!</h2>
//       <p>Enjoy connecting and sharing posts with your friends 🚀</p>
//     </div>
//   );
// }

