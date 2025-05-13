import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { fetchUsers, getAvatarUrl } from '../api';
import './UserListPage.css';

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        setError(null);
      } catch (err) {
        setError('Failed to load users. Please try refreshing the page.');
        console.error(err);
      }
      setLoading(false);
    };
    loadUsers();
  }, []);

  if (loading) {
    return <div className="loading-state">Loading users...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <div className="user-list-page albums-table-area">
      <h1 className="page-title">Users</h1>
      <table className="albums-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img
                  src={getAvatarUrl(user.name, 40)}
                  alt={`${user.name}'s avatar`}
                  className="user-avatar-img"
                />
              </td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`} className="clickable-link">
                  {user.email}
                </a>
              </td>
              <td>
                <a href={`tel:${user.phone}`} className="clickable-link">
                  {user.phone}
                </a>
              </td>
              <td>
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clickable-link"
                >
                  {user.website}
                </a>
              </td>
              <td>
                <Link to={`/users/${user.id}`} className="show-btn">
                  <span className="eye-icon">👁️</span> Show
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
