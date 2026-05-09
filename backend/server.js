require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// ── Middlewares ──
app.use(cors());
app.use(express.json());

// ── MySQL Connection ──
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
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
    

app.post("/api/contact", (req, res) => {

    console.log(req.body);

    const { name, email, topic, message } = req.body;
    const finalTopic = topic || "other";

    const sql = `
        INSERT INTO messages (name, email, topic, message)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, finalTopic, message], (err, result) => {

        if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json({
                success: false,
                error: err
            });
        }

        console.log("✅ Saved:", result.insertId);

        res.json({
            success: true
        });
    });
});

// ── FIXED PORT FOR RENDER ──
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("🚀 Server running on port", PORT);
});