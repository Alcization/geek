# Geek Web App

A web application that displays Albums and Users, built with React + TypeScript + Vite.  
It integrates with public APIs to fetch data and follows UI/UX best practices.

![GeekUp Album Manager](https://geekup.vn/Icons/geekup-logo-general.svg)

## 🌐 Live Demo

[Visit the live app](https://your-app-url.vercel.app/) <!-- Replace with actual URL -->

---

## 📋 Features

### ✅ API Integration
- Fetches albums, users, and photos from [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- Uses [UI Avatars](https://ui-avatars.com/) to generate user avatars dynamically

### 📁 Modules

#### 1. Album

- **Album List**
  - Displays all 100 albums in a table
  - Columns: ID, Title, User (Name + Avatar), Actions (View button)
  - Pagination included, with current page stored in URL (e.g. `?page=2`)
  - Clicking on user navigates to user detail

- **Album Detail**
  - Displays:
    - Album title
    - User info (avatar, name, email) — click on name to view user detail
    - List of album photos (thumbnails), each clickable to open full-size image

#### 2. User

- **User List**
  - Displays all 10 users in a table
  - Columns: ID, Avatar, Name, Email, Phone, Website, Actions
  - Clicking on row or button opens user detail

- **User Detail**
  - Shows user avatar, name, email
  - Displays a list of their albums with links to album detail pages

---

## 💄 UI/UX Highlights

- Responsive for screens ≥ 1280px wide
- Clean and minimal design using plain CSS
- Loading states during API calls
- Cursor pointer for all clickable elements
- Emails and phone numbers are clickable (`mailto:` / `tel:`)
- Website links open in a new tab
- All `<img>` elements include meaningful `alt` attributes

---

## 🔧 Tech Stack

- React
- TypeScript
- Vite
- CSS Modules

---

## 📂 Project Structure

```bash
src/
├── components/        # Reusable UI components
├── pages/             # Main pages: AlbumList, AlbumDetail, UserList, UserDetail
├── api.ts             # API call logic
├── App.tsx            # App routing
└── main.tsx           # App entry point

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/GeekUp-Frontend-Technicial-Assessment.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn run dev
```

This project is licensed under the MIT License - see the LICENSE file for details.
