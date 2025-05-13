import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from "./AlbumListPage.module.css"; // CSS thuần

const ALBUMS_API = "https://jsonplaceholder.typicode.com/albums";
const USERS_API = "https://jsonplaceholder.typicode.com/users";

const getAvatarURL = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=48&background=random`;

export default function AlbumListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(params.get("page") || "1", 10);
  const [pageSize, setPageSize] = useState(10);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageFromUrl);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(ALBUMS_API).then((r) => r.json()),
      fetch(USERS_API).then((r) => r.json()),
    ]).then(([albumData, userData]) => {
      setAlbums(albumData);
      setUsers(userData);
      setLoading(false);
    });
  }, []);

  const totalPages = Math.ceil(albums.length / pageSize);
  const paginated = albums.slice((page - 1) * pageSize, page * pageSize);

  const getUserById = (userId: number) =>
    users.find((u) => u.id === userId) || { id: 0, name: "Unknown User" };

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`);
  };

  return (
    <div style={{ minWidth: "calc(100% - 48px)", padding: "0px" }}>
      <div className={styles.container}>
        <h1 className={styles.title}>Albums</h1>
        {loading ? (
          <div className={styles.loading}>Loading albums...</div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((album: any) => {
                  const user = getUserById(album.userId);
                  return (
                    <tr key={album.id}>
                      <td>{album.id}</td>
                      <td>{album.title}</td>
                      <td>
                        <Link to={`/users/${user.id}`} className={styles.user}>
                          <img
                            src={getAvatarURL(user.name || "")}
                            alt={user.name || "User"}
                            className={styles.avatar}
                          />
                          <span>{user.name || "User"}</span>
                        </Link>
                      </td>
                      <td>
                        <button
                          className={styles.viewButton}
                          onClick={() => navigate(`/albums/${album.id}`)}
                        >
                          👁 Show
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
      {!loading && (
        <div className={styles.paginationWrapper + ' ' + styles.paginationOutside}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            &larr;
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={page === pageNum ? styles.activePage : ""}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            &rarr;
          </button>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
              navigate(`?page=1`);
            }}
            className={styles.pageSizeSelect}
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </div>
      )}
    </div>
  );
}
