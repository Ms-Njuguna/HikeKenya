# HikeKenya

HikeKenya is a Vite + React single-page application designed to help users discover, join, and review hiking trails across Kenya. Built with a modern UI, it offers a seamless experience for outdoor enthusiasts—from exploring trails to booking trips and tracking hiking history.

---

## Features

### General User Features

* **Search Trails**: Users can search trails by title using a real-time search bar.
* **TrailCard Components**: Display trail name, description, and other key information.
* **Trail Details Page**: Shows route map and a detailed description of each trail.
* **Favorite Trails**: Users can save trails to their personal favorites list.
* **Leave Comments/Reviews**: Users can leave comments and reviews on attended trails.

---

### Authentication

* **Sign Up & Login**: Full user authentication functionality.
* **Authenticated User Access**: Authenticated users can access personal dashboards.
* **Dynamic Data Fetching**: Data is fetched dynamically from a json-server mock API (db.json).

---

### Dashboard Functionality

* **My Trails Section**: Displays trails a user has selected or paid for.
* **Mark as Attended**: Button to mark completed hikes.
* **Badge & Points System**: Gamified experience for attended hikes.
* **Hiking History**: Shows attended trails with options for reviews and comments.

---

### Booking & Payments

* **Join Trail Functionality**: Users can join trails via a "Join Button."
* **M-Pesa Modal**: Appears after clicking the "Pay with M-Pesa" button.
* **Simulated Payment Logic**: Payment is simulated with a dummy modal interface.

---

### UI and Design

* **Fully Responsive Layout**: Mobile-friendly views ensure accessibility on various devices.
* **Custom CSS Styling**: Unique and consistent visual design.
* **Modular React Components**: Utilizes reusable components such as `TrailCard`, `MpesaModal`, `NavBar`, `MyTrailsList`, and `AttendedTrails`.

---

## Tech Stack

* **React (Vite)**: Frontend framework.
* **React Router DOM**: Client-side routing.
* **JSON Server**: For RESTful API simulation.
* **Custom CSS**: For styling.
* **useState, useEffect Hooks**: For state and data handling.

---

## File Structure (Simplified)

```bash

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

### Running the Project Locally

#### Setup Instructions
1. Clone the Repository

```bash

git clone [https://github.com/Ms-Njuguna/HikeKenya](https://github.com/Ms-Njuguna/HikeKenya)
cd hikekenya

```

2. Install Dependencies

```bash

npm install

```

3. Start JSON Server

```bash

npm run server

```

4. Start the React App

```bash

npm run dev

```

### Project Preview

- Here is a preview of how the project works

[project preview](./public/0726.gif)

---


### Team Members & Roles

- [Patricia](https://github.com/Ms-Njuguna/HikeKenya) : Map, Routing, Weather, Entire Dashboard UI + CSS Styling

- [Mary](https://github.com/marsha-blip): Authentication (UI + Logic) & Navbar

- [Bonfas](https://github.com/tronzee-star): Trail Cards UI, Carousel, and Badge Point System

- [Newton](https://github.com/Newton-Oduor): Core logic (Join Hike, Payment Modal, Favorites)

- All team members: Debugging & any Additional Components/Logic

---

### Future Improvements

- GPS-based Navigation for real-time trail tracking.

- PWA Support for offline usability.

- Admin Dashboard for trail management.

- User Profiles for identity, sharing, and social interaction.

---

### License

This project is licensed under the MIT License © 2025 HikeKenya.

