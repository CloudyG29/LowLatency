const prisma = require("../../DB_connect/prisma");

function authorize(allowedRoles) {
  return async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: { firebase_uid: req.user.uid }
      });

      if (!user) {
        return res.status(403).json({ error: "User not found in database" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      req.dbUser = user;
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({ error: "Authorization failed" });
    }
  };
}

module.exports = authorize;