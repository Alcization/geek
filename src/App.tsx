import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AlbumListPage from './pages/AlbumListPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import UserListPage from './pages/UserListPage';
import UserDetailPage from './pages/UserDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-root">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/albums" replace />} />
            <Route path="/albums" element={<AlbumListPage />} />
            <Route path="/albums/:albumId" element={<AlbumDetailPage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/:userId" element={<UserDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
