const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// Serve everything in the project directory
app.use(express.static(PUBLIC_DIR, {
    extensions: ["html"]
}));

// Make / load index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, "GD.html"));
});

// SPA/fallback-style handling for game URLs
app.get("*splat", (req, res, next) => {
    const requestedPath = path.join(PUBLIC_DIR, req.path);

    if (req.path.startsWith("/assets/")) {
        return res.status(404).send("Asset not found");
    }

    res.sendFile(path.join(PUBLIC_DIR, "GD.html"), err => {
        if (err) next(err);
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`GD RUNNING ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
});
