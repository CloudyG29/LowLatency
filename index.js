const express = require("express");
const path = require("path");
const sql = require('mssql');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const dbConfig = {
  server: 'lowlatency.database.windows.net',
  database: 'SkillBridge',
  user: 'CloudSA22f63f5f',
  password: 'LowLatency5',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

sql.connect(dbConfig).then(() => {
  console.log('Database connected');
}).catch(err => {
  console.error('Database connection failed:', err);
});

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/dummy-site", express.static(path.join(__dirname, "dummy-site")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get('/api/user/role', async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    const result = await sql.query`SELECT role FROM [User] WHERE email = ${email}`;
    if (result.recordset.length > 0) {
      res.json({ role: result.recordset[0].role });
    } else {
      res.json({ role: 'Applicant' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.post('/api/user/register', async (req, res) => {
  const { name, surname, email } = req.body;
  try {
    const existing = await sql.query`SELECT user_id FROM [User] WHERE email = ${email}`;
    if (existing.recordset.length > 0) {
      return res.json({ message: 'User already exists' });
    }
    await sql.query`INSERT INTO [User] (name, surname, email, role) 
                    VALUES (${name}, ${surname}, ${email}, 'Applicant')`;
    res.json({ message: 'User registered' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
