let admin;

try {
  admin = require("../firebaseAdmin");
} catch (error) {
  admin = null;
}

async function authenticate(req, res, next) {
  if (!admin) {
    return res.status(500).json({ error: "Firebase Admin not configured yet" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticate;