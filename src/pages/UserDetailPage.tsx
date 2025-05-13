import React, { useEffect, useState } from 'react';
import styles from './UserDetailPage.module.css';
import {  Link, useParams  } from 'react-router-dom';

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const UserDetailPage: React.FC = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    if (userId) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.json())
        .then(data => setUser(data));

      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then(res => res.json())
        .then(data => setAlbums(data));
    }
  }, [userId]);

  return (
    <div className={styles.container}>
      <p className={styles.breadcrumb}>Users / <span className={styles.gray}>Show</span></p>
      <h2 className={styles.title}>Show User</h2>

      <div className={styles.card}>
        <div className={styles.userInfo}>
          <div className={styles.avatarCircle}>
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h3 className={styles.name}>{user?.name}</h3>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </div>

        <h4 className={styles.subTitle}>Albums</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {albums.map(album => (
              <tr key={album.id}>
                <td>{album.id}</td>
                <td>{album.title}</td>
                <td>
                  <Link to={`/albums/${album.id}`} className={styles.showButton}>
                    👁 Show
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetailPage;
