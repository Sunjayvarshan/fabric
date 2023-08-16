const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "salt", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = requireAuth;
