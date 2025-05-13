import { User, Album, Photo } from './types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const fetchUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!response.ok) throw new Error(`Failed to fetch user ${userId}`);
  return response.json();
};

export const fetchAlbums = async (): Promise<Album[]> => {
  const response = await fetch(`${API_BASE_URL}/albums`);
  if (!response.ok) throw new Error('Failed to fetch albums');
  return response.json();
};

export const fetchAlbum = async (albumId: number): Promise<Album> => {
  const response = await fetch(`${API_BASE_URL}/albums/${albumId}`);
  if (!response.ok) throw new Error(`Failed to fetch album ${albumId}`);
  return response.json();
};

export const fetchPhotosByAlbum = async (albumId: number): Promise<Photo[]> => {
  const response = await fetch(`${API_BASE_URL}/albums/${albumId}/photos`);
  if (!response.ok) throw new Error(`Failed to fetch photos for album ${albumId}`);
  return response.json();
};

export const fetchAlbumsByUser = async (userId: number): Promise<Album[]> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/albums`);
  if (!response.ok) throw new Error(`Failed to fetch albums for user ${userId}`);
  return response.json();
};

export const getAvatarUrl = (name: string, size: number = 50): string => {
  const formattedName = name.replace(/\s+/g, '+');
  return `https://ui-avatars.com/api/?name=${formattedName}&size=${size}&background=random&color=fff`;
};
