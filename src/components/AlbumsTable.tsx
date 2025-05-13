import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const ALBUMS_API = "https://jsonplaceholder.typicode.com/albums";
const USERS_API = "https://jsonplaceholder.typicode.com/users";
const PAGE_SIZE = 10;

const getAvatarURL = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=48&background=random`;

export default function AlbumTable() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(params.get("page") || "1", 10);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
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

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`);
  };

  // Pagination
  const totalPages = Math.ceil(albums.length / PAGE_SIZE);
  const paginated = albums.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function getUserById(userId: number) {
    // @ts-ignore
    return users.find((u) => u.id === userId) || {};
  }

  return (
    <div className="max-w-screen-xl mx-auto px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Albums</h1>
      {loading ? (
        <div className="text-center py-10 text-zinc-500">Loading albums...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-zinc-200 bg-white rounded">
            <thead>
              <tr className="bg-zinc-100 text-zinc-700">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-zinc-800">
              {paginated.map((album: any) => {
                const user = getUserById(album.userId);
                return (
                  <tr key={album.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3">{album.id}</td>
                    <td className="px-4 py-3 break-words max-w-xs">{album.title}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/users/${user.id}`}
                        className="flex items-center gap-2 group cursor-pointer"
                        title="View user details"
                      >
                        <img
                          src={getAvatarURL(user.name || "")}
                          alt={user.name || "User avatar"}
                          className="rounded-full w-8 h-8 border-zinc-200 border"
                        />
                        <span className="underline text-blue-600 group-hover:text-blue-800">
                          {user.name || "User"}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="px-3 py-1 bg-zinc-200 rounded font-medium hover:bg-zinc-300 cursor-pointer"
                        onClick={() => navigate(`/albums/${album.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="mt-6 flex justify-end items-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-2 py-1 rounded disabled:opacity-30 cursor-pointer"
              aria-label="Previous page"
            >
              &larr;
            </button>
            <span className="mx-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-2 py-1 rounded disabled:opacity-30 cursor-pointer"
              aria-label="Next page"
            >
              &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
