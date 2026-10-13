
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve website files
app.use(express.static(__dirname, {
    index: false,
    dotfiles: "ignore"
}));

// Read JSON datasets
function readDataset(filename) {
    const filePath = path.join(__dirname, "data", filename);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

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

// API: Retrieve services
app.get("/api/services", (req, res) => {
    try {
        const services = readDataset("services.json");

        res.json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        console.error("Error loading services:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve services."
        });
    }
});

// API: Retrieve customer records
app.get("/api/customers", (req, res) => {
    try {
        const customers = readDataset("customers.json");

        res.json({
            success: true,
            count: customers.length,
            data: customers
        });
    } catch (error) {
        console.error("Error loading customers:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve customer records."
        });
    }
});

// Start server locally or export for Vercel
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`ADF2027 running at http://localhost:${PORT}`);
    });
}

module.exports = app;
