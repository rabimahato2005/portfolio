# Personal Portfolio Website

A full-stack personal portfolio website built using HTML, CSS, JavaScript, Node.js, Express, and MySQL.

## 🚀 Live Demo

Frontend:
https://subtle-pithivier-b9e47a.netlify.app/

Backend API:
https://portfolio-backend-xneg.onrender.com

---

## 📌 Features

* Responsive portfolio website
* Contact form with backend API
* MySQL database integration
* Live deployment
* GitHub integration
* Form validation
* Dynamic message storage

---

## 🛠 Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL (Railway)

### Deployment

* Netlify (Frontend)
* Render (Backend)

---

## 📂 Project Structure

portfolio/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
├── forntend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│
├── .gitignore
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file inside backend folder:

```env
DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

---

## ▶️ Run Locally

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

Open `index.html` in browser.

---

## 🗄 Database Table

```sql
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    topic VARCHAR(255),
    message TEXT
);
```

---

## 👨‍💻 Author

Rabi Kumar Mahato
