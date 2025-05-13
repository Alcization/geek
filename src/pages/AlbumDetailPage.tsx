import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AlbumDetailPage.module.css';

interface Album {
  id: number;
  title: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
}

const AlbumDetailPage: React.FC = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (albumId) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
        .then(res => res.json())
        .then(data => {
          setAlbum(data);
          return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
        })
        .then(res => res.json())
        .then(data => setUser(data));

      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then(res => res.json())
        .then(data => setPhotos(data));
    }
  }, [albumId]);

  return (
    <div className={styles.container}>
      <p className={styles.breadcrumb}>Albums / <span className={styles.gray}>Show</span></p>
      <h2 className={styles.title}>Show Album</h2>

      <div className={styles.card}>
        <div className={styles.userInfo}>
          <div className={styles.avatarCircle}>{user?.name?.charAt(0)}</div>
          <div>
            <h3 className={styles.name}>{user?.name}</h3>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </div>

        <h4 className={styles.albumTitle}>{album?.title}</h4>

        <div className={styles.photoGrid}>
          {photos.map(photo => (
            <div
              key={photo.id}
              className={styles.photoItem}
              onClick={() => setPreviewPhoto(photo)}
              title="Click to preview"
            >
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </div>
          ))}
        </div>
      </div>

      {previewPhoto && (
        <div className={styles.modal} onClick={() => setPreviewPhoto(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <img src={previewPhoto.url} alt={previewPhoto.title} />
            <p>{previewPhoto.title}</p>
            <button className={styles.closeButton} onClick={() => setPreviewPhoto(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetailPage;
