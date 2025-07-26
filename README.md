# 🥾 HikeKenya

*HikeKenya* is a Vite + React single-page application designed to help users discover, join, and review hiking trails across Kenya. Built with a modern UI, it offers a seamless experience for outdoor enthusiasts — from exploring trails to booking trips and tracking hiking history.

---

## 🚀 Features

### 🧭 General User Features

- 🔍 *Search Trails* by title using a real-time search bar
- 🧾 *TrailCard Components* display trail name, description, and other key info
- 🗺 *Trail Details Page* shows route map and detailed description
- ❤ *Favorite Trails* – users can save trails to their personal favorites list
- ✍ *Leave Comments/Reviews* on attended trails

---

### 🔐 Authentication

- 👤 *Sign Up & Login* functionality for user authentication
- 🧑‍💼 Authenticated users can access personal dashboards
- 🧳 Data is fetched dynamically from a json-server mock API (db.json)

---

### 🧳 Dashboard Functionality

- 📋 *My Trails* section displays trails a user has selected or paid for
- 📌 *Mark as Attended* button for completed hikes
- 🏅 *Badge & Points System* for attended hikes (Gamified experience)
- 📖 *Hiking History* shows attended trails with review/comment options

---

### 💸 Booking & Payments

- 💳 *Join Trail* functionality (Join Button)
- 📱 *M-Pesa Modal* appears after clicking "Pay with M-Pesa" button
- ⏱ Payment logic is simulated with a dummy modal interface

---

### 🌍 UI and Design

- 📱 Fully responsive layout with mobile-friendly views
- 🎨 Custom *CSS styling*
- 🧩 Modular React components (e.g., TrailCard, MpesaModal, NavBar, MyTrailsList, AttendedTrails, etc.)

---

## 🛠 Tech Stack

- ⚛ *React (Vite)*
- 🗂 *React Router DOM* for Client-side Routing
- 📦 *JSON Server* for RESTful API simulation
- 💅 *Custom CSS*
- 🧠 *useState, useEffect Hooks* for state and data handling

---

## 📁 File Structure (Simplified)

```FS
src/
├── App.jsx
├── index.css
├── main.jsx
├── db.json

├── context/
│   └── AuthContext.jsx

├── components/
│   ├── Auth/
│   │   └── LoginForm.jsx
│   │   └── RegisterForm.jsx
│
│   ├── Dashboard/
│   │   └── StatsCard.jsx
│
│   ├── Map/
│   │   └── TrailMap.jsx
│
│   ├── Mpesa/
│   │   └── MpesaModal.jsx
│
│   ├── Payments/
│   │   └── PaymentHistory.jsx
│
│   ├── Trails/
│   │   └── TrailCard.jsx
│   │   └── TrailList.jsx
│   │   └── JoinTrailButton.jsx
│
│   ├── Weather/
│   │   └── WeatherCard.jsx
│
│   └── NavBar.jsx

├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── DashboardPage.jsx
│   ├── TrailDetails.jsx

├── routes/
│   └── AppRoutes.jsx

├── ImageIcons/
│   └── HikerIcon.jsx
│   └── TrailIcon.jsx

```

---

## 🧪 Running the Project Locally

### 🔧 Setup Instructions

1.*Clone the Repository*

```bash
   git clone https://github.com/Ms-Njuguna/HikeKenya
   cd hikekenya
```

2.*Install Dependencies*

```bash
   npm install
  ```

3.*Start JSON Server*

```bash
   npx json-server --watch db.json --port 3000
```

4.*Start the React App*

```bash
   npm run dev
```

---

## 🌐 Live Demo

> Coming soon... (host with services like Netlify, Vercel, or GitHub Pages)

---

## 👨‍💻 Team Members & Roles

- *Patricia* – Map, Routing, Weather, Entire Dashboard UI + CSS Styling
- *Mary* – Auth (UI + Logic) & Navbar
- *Bonfas* – Trail Cards UI, Carousel and Badge Poin System
- *Newton* – Core logic (Join Hike, Payment Modal, Favorites)
- *All team members* – Debbuging & any Additional Components/Logic

---

## 📜 License

This project is licensed under the MIT License © 2025 HikeKenya Team.

---

## 💡 Future Improvements

- 🌍 Google Maps or OpenStreetMap Integration
- 🧭 GPS-based navigation
- 📲 PWA Support for offline use
- 📈 Admin dashboard for trail management
- 🧑 User Profiles to captures the essence of personal identity, sharing, and interaction

---

### 💬 For Feedback or Questions

Please reach out via [GitHub Issues] or email the dev team.

---
