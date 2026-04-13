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