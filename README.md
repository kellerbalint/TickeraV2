# Tickera 🎟️

A simple and modern ticket reservation web application built with **React** and **Vite**.

🔗 **Live Demo:** [https://tickera-v2.vercel.app/](https://tickera-v2.vercel.app/)

---

## 🚀 Features

- User authentication (login/register/logout)
- Movie listings and screening schedules
- Ticket reservation for registered users
- Admin panel for adding movies and screenings
- Responsive UI for both desktop and mobile devices

---

## 🧑‍💻 User Roles & Routes

### 🔓 Public (not logged in)
- `/` — Home page with movie listings
- `/login` — Login form
- `/register` — Registration form

### 🔒 Logged-in Users
- `/` — Home
- `/profile` — View personal bookings / user info
- `/logout` — Log out of the account

### 🛠️ Admin Users
- `/` — Admin dashboard / home
- `/logout` — Log out of the account
- `/add-movie` — Add new movie to the system
- `/add-screening` — Add new screening time

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/) (optional if used)
- [Vercel](https://vercel.com/) for deployment

---

## 📦 Installation

```bash
git clone https://github.com/your-username/tickera.git
cd tickera
npm install
npm run dev
```
The app will be available at http://localhost:5173
