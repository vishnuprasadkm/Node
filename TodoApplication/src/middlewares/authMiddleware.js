import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err)
      res.status(403).json({
        status: 403,
        message: "Invalid or expired token",
        error: err.message,
      }); // Invalid token
    req.user = user;
    next();
  });
};

export default authenticateToken;
