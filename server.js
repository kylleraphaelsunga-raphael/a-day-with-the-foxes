const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve website files from the project folder
app.use(express.static(__dirname));

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Features page
app.get("/features.html", (req, res) => {
    res.sendFile(path.join(__dirname, "features.html"));
});

// Services page
app.get("/services.html", (req, res) => {
    res.sendFile(path.join(__dirname, "services.html"));
});

// Contact page
app.get("/contact.html", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`ADF2027 running at http://localhost:${PORT}`);
});