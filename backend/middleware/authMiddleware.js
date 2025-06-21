exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: 'fail',
          message: 'У вас нет прав на это действие'
        });
      }
      next();
    };
  };
  
  exports.checkPermission = (permission) => {
    return (req, res, next) => {
      if (!req.user.hasPermission(permission)) {
        return res.status(403).json({
          status: 'fail',
          message: 'Недостаточно прав'
        });
      }
      next();
    };
  };