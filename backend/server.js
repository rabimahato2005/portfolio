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
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("❌ DB connection failed", err);
    } else {
        console.log("✅ MySQL connected");
    }
});

// ── Test Route ──
app.get("/test-db", (req, res) => {
    db.query("SELECT 1", (err) => {
        if (err) return res.send("DB NOT CONNECTED ❌");
        res.send("DB CONNECTED ✅");
    });
});

// ── CONTACT API (FIXED ROUTE) ──
app.post("/api/contact", (req, res) => {
    const { name, email, topic, message } = req.body;

    // validation (important)
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    const sql =
        "INSERT INTO messages (name, email, topic, message) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, topic, message], (err, result) => {
        if (err) {
            console.log("DB Error:", err);
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        console.log("📩 Saved in DB ID:", result.insertId);

        res.json({
            success: true,
            message: "Message saved successfully"
        });
    });
});

// ── FIXED PORT FOR RENDER ──
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("🚀 Server running on port", PORT);
});