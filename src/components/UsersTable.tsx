import React, { useState } from "react";
import Modal from "./Modal";
import "./AlbumsTable.css";

const users = [
  { id: 1, name: "Leanne Graham", initials: "LG", color: "#c62862", email: "leanne.graham@example.com" },
  { id: 2, name: "Ervin Howell", initials: "EH", color: "#bcbcbc", email: "ervin.howell@example.com" },
  { id: 3, name: "Clementine Bauch", initials: "CB", color: "#3b82f6", email: "clementine.bauch@example.com" },
  { id: 4, name: "Patricia Lebsack", initials: "PL", color: "#7c7c7c", email: "patricia.lebsack@example.com" },
  { id: 5, name: "Chelsey Dietrich", initials: "CD", color: "#9aa4b4", email: "chelsey.dietrich@example.com" },
  { id: 6, name: "Mrs. Dennis Schulist", initials: "DS", color: "#f696c0", email: "dennis.schulist@example.com" },
  { id: 7, name: "Kurtis Weissnat", initials: "KW", color: "#46505b", email: "kurtis.weissnat@example.com" },
  { id: 8, name: "Nicholas Runolfsdottir V", initials: "NR", color: "#f7c8eb", email: "nicholas.runolfsdottir@example.com" },
  { id: 9, name: "Glenna Reichert", initials: "GR", color: "#bcbcbc", email: "glenna.reichert@example.com" },
  { id: 10, name: "Clementina DuBuque", initials: "CD", color: "#cddade", email: "clementina.dubuque@example.com" },
  // for pagination demo, duplicate users
  { id: 11, name: "Ervin Howell 2", initials: "EH", color: "#bcbcbc", email: "ervin.howell2@example.com" },
  { id: 12, name: "Clementina DuBuque 2", initials: "CD", color: "#cddade", email: "clementina.dubuque2@example.com" },
  { id: 13, name: "Chelsey Dietrich 2", initials: "CD", color: "#9aa4b4", email: "chelsey.dietrich2@example.com" },
  { id: 14, name: "Nicholas Runolfsdottir 2", initials: "NR", color: "#f7c8eb", email: "nicholas.runolfsdottir2@example.com" },
  { id: 15, name: "Kurtis Weissnat 2", initials: "KW", color: "#46505b", email: "kurtis.weissnat2@example.com" }
];

const PAGE_SIZE = 10;
const totalPages = Math.ceil(users.length / PAGE_SIZE);

// Mock albums data for the user modal (assuming these are all albums for a user)
const userAlbumsData = [
  { id: 1, title: "quidem molestiae enim" },
  { id: 2, title: "sunt qui excepturi placeat culpa" },
  { id: 3, title: "omnis laborum odio" },
  { id: 4, title: "non esse culpa molestiae omnis sed optio" },
  { id: 5, title: "eaque aut omnis a" },
  { id: 6, title: "natus impedit quibusdam illo est" },
  { id: 7, title: "quibusdam autem aliquid et et quia" },
  { id: 8, title: "qui fuga est a eum" },
  { id: 9, title: "saepe unde necessitatibus rem" },
  { id: 10, title: "distinctio laborum qui" },
];

const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<null | { id: number; name: string; initials: string; color: string; email: string }>(null);
  const [showAlbumModal, setShowAlbumModal] = useState<null | { album: Album; user: User }>(null); // For album from user's album list
  const pageUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  interface Album {
    id: number;
    title: string;
  }

  interface User {
    id: number;
    name: string;
    initials: string;
    color: string;
    email: string;
  }

  interface AlbumModalData {
    album: Album;
    user: User;
  }

  const openAlbumDetails = (album: Album): void => {
    // This requires finding the original user object associated with this album
    // For mock, we'll just use the currently selectedUser's info if available
    const albumUser: User = selectedUser || users.find((u) => u.id === 1)!; // Fallback to first user for demo
    setShowAlbumModal({ album, user: albumUser });
  };

  return (
    <div className="albums-table-area">
      <table className="albums-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <span className="user-badge" style={{ background: user.color }}>
                  {user.initials}
                </span>
                <span className="user-name">{user.name}</span>
              </td>
              <td>
                <button
                  className="show-btn"
                  onClick={() => setSelectedUser(user)}
                >
                  <span className="eye-icon">👁️</span> Show
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-area">
        <button
          className="pagination-arrow"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ opacity: page === 1 ? 0.55 : 1 }}
        >
          &#60;
        </button>
        {[...Array(totalPages).keys()].map((n) => (
          <button
            className={`pagination-num${page === n + 1 ? " active" : ""}`}
            key={n + 1}
            onClick={() => setPage(n + 1)}
          >
            {n + 1}
          </button>
        ))}
        <button
          className="pagination-arrow"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{ opacity: page === totalPages ? 0.55 : 1 }}
        >
          &#62;
        </button>
        <select className="page-size-select" value={PAGE_SIZE} disabled>
          <option>10 / page</option>
        </select>
      </div>
      <Modal open={!!selectedUser && !showAlbumModal} onClose={() => setSelectedUser(null)}>
        {selectedUser && (
          <div className="user-modal-card" style={{ borderRadius: 12, background: '#fff', padding: 24, minWidth: 550, boxShadow: '0 2px 16px #0001' }}>
            <div className="user-modal-info-row" style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <span className="user-badge" style={{ background: selectedUser.color, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, marginRight: 16 }}>
                {selectedUser.initials}
              </span>
              <div className="user-modal-details">
                <div style={{ color: '#222', fontWeight: 600, fontSize: 17 }}>{selectedUser.name}</div>
                <div className="user-modal-email" style={{ color: '#555', fontSize: 14 }}>{selectedUser.email}</div>
              </div>
            </div>
            <div className="modal-divider" style={{ borderBottom: '1px solid #eee', margin: '16px 0' }} />
            <div style={{ fontWeight: 600, fontSize: 18, color: '#333', marginBottom: 10 }}>Albums</div>
            <table className="albums-table modal-albums-table" style={{ fontSize: '0.95rem' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userAlbumsData.slice(0, 5).map((album) => (
                  <tr key={album.id}>
                    <td>{album.id}</td>
                    <td>{album.title}</td>
                    <td>
                      <button className="show-btn modal-show-btn" onClick={() => openAlbumDetails(album)} style={{ padding: '5px 12px 5px 8px', fontSize: '0.95rem'}}>
                        <span className="eye-icon">👁️</span> Show
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>

      <Modal open={!!showAlbumModal} onClose={() => setShowAlbumModal(null)}>
        {showAlbumModal && (
           <div className="album-modal-card" style={{ borderRadius: 12, background: '#fff', padding: 24, minWidth: 420, boxShadow: '0 2px 16px #0001' }}>
            <div className="album-modal-user-row" style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <span className="user-badge" style={{ background: showAlbumModal.user.color, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, marginRight: 16 }}>{showAlbumModal.user.initials}</span>
              <div className="album-modal-user-details">
                <a href="#" style={{ color: '#1976d2', fontWeight: 600, fontSize: 17 }}>{showAlbumModal.user.name}</a>
                <div className="album-modal-user-email" style={{ color: '#555', fontSize: 14 }}>{showAlbumModal.user.email}</div>
              </div>
            </div>
            <div className="modal-divider" style={{ borderBottom: '1px solid #eee', margin: '16px 0' }} />
            <div className="album-modal-title" style={{ fontWeight: 600, fontSize: 20, marginBottom: 10 }}>{showAlbumModal.album.title}</div>
            <div style={{ fontWeight: 500, color: '#888', fontSize: 15, marginBottom: 8 }}>Photos</div>
            <div className="album-modal-photos" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[...Array(4)].map((_, i) => (
                <div className="album-modal-photo-tile" key={i} style={{ borderRadius: 8, overflow: 'hidden', background: '#fafbfc', boxShadow: '0 1px 4px #0001', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 8 }}>
                  <img src={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&${i}`} alt={`Sample ${i+1}`} className="album-modal-photo-img" style={{ width: '100%', borderRadius: 6, marginBottom: 6 }} />
                  <div className="album-modal-photo-caption" style={{ fontSize: 13, color: '#444', textAlign: 'center' }}>Sample Photo {i+1}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UsersTable;
