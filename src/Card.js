import React, { useState } from 'react';
import './Card.css';

function GitHubCard() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
    }
  };

  return (
    <div className="github-card">
      <h1>GitHub User</h1>
      <form onSubmit={e => {
        e.preventDefault();
        fetchUserData();
      }}>
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Fetch Details</button>
      </form>
      {userData && (
        <div className="user-card">
          <h2>{userData.login}</h2>
          <img src={userData.avatar_url} alt="Avatar" />
          <p>Public Gists: {userData.public_gists}</p>
          <p>Profile Created At: {new Date(userData.created_at).toLocaleDateString('en-US')}</p>
          <p>Public Repos: {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default GitHubCard;
