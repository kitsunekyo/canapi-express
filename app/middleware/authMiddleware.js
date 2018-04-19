const User = require('./../models/User');

const authMiddleware = {
  guard: function (req, res, next) {
    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            return res.redirect('/login');
          } else {
            return next();
          }
        }
      });
  }
};

module.exports = authMiddleware;