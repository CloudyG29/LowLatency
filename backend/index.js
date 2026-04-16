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