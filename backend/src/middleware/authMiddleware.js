import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    // =================================================
    // Check JWT secret
    // =================================================

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is not configured",
      );

      return res.status(500).json({
        success: false,
        message:
          "Authentication service is not configured",
      });
    }

    // =================================================
    // Get token
    // =================================================

    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Not authorized. Token is required.",
      });
    }

    // =================================================
    // Verify token
    // =================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    // =================================================
    // Attach authenticated user
    // =================================================

    req.user = decoded;

    next();
  } catch (error) {
    // =================================================
    // Invalid / expired token
    // =================================================

    return res.status(401).json({
      success: false,
      message:
        "Not authorized. Invalid or expired token.",
    });
  }
};

export default protect;