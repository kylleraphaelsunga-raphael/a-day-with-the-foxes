
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve CSS, JavaScript, and images
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// Read JSON datasets
function readDataset(filename) {
    const filePath = path.join(__dirname, "data", filename);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Serve HTML pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/features.html", (req, res) => {
    res.sendFile(path.join(__dirname, "features.html"));
});

app.get("/services.html", (req, res) => {
    res.sendFile(path.join(__dirname, "services.html"));
});

app.get("/contact.html", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
});

app.get("/api.html", (req, res) => {
    res.sendFile(path.join(__dirname, "api.html"));
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

// Start server locally
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`ADF2027 running at http://localhost:${PORT}`);
    });
}

module.exports = app;
