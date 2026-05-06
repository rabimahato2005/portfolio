require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// ── MySQL Connection ──
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.log("❌ DB connection failed", err);
    } else {
        console.log("✅ MySQL connected");
    }
});

// ── Test Route ──
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// ── Contact API ──
app.post("/contact", (req, res) => {
    const { name, email, topic, message } = req.body;

    const sql = "INSERT INTO messages (name, email, topic, message) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, topic, message], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ success: false });
        }

        console.log("📩 Saved in DB ID:", result.insertId);

        res.json({ success: true });
    });
});

// ── Server Start ──
app.listen(5000, () => {
    console.log("Server running on port 5000");
});