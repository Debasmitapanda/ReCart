// backend/src/middlewares/roleMiddleware.js

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Assuming req.user is set by authMiddleware
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user ? req.user.role : 'Unknown'} is not authorized to access this route`,
      });
    }
    next();
  };
};

export const adminOnly = authorizeRoles('admin');

