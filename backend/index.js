const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "../frontend")));

app.use(express.json());
// app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "login.html"));
});

app.get("/signup-applicant", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "signup-applicant.html"));
});

app.get("/signup-provider", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "signup-provider.html"));
});

app.get("/signup-admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "signup-admin.html"));
});

app.get("/applicant", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/roles_htmls", "applicant_view.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/roles_htmls", "admin_view.html"));
});

app.get("/provider", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/roles_htmls", "provider_view.html"));
});

app.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "forgot-password.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// backend/routes/user.js (example)
app.post('/api/user/register', async (req, res) => {
    const { name, surname, email, role, firebase_uid } = req.body;
    
    try {
        const user = await prisma.user.create({
            data: {
                name,
                surname,
                email,
                role,
                firebase_uid
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "User already exists or data is invalid" });
    }
});

// Assuming you have your Prisma client imported at the top of your file
// e.g., const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

app.get('/api/user/role', async (req, res) => {
    // 1. Grab the email from the URL query string (e.g., ?email=test@test.com)
    const userEmail = req.query.email;

    if (!userEmail) {
        return res.status(400).json({ error: "Email parameter is required" });
    }

    try {
        // 2. Ask Prisma to find the exact user
        const user = await prisma.user.findUnique({
            where: { 
                email: userEmail 
            },
            // Pro-tip: Only select the field you need to save database bandwidth
            select: { 
                role: true 
            } 
        });

        // 3. If the user isn't in your SQL database yet
        if (!user) {
            return res.status(404).json({ error: "User not found in database" });
        }

        // 4. Send the role back to your frontend!
        res.status(200).json({ role: user.role });

    } catch (error) {
        console.error("Database error fetching role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});