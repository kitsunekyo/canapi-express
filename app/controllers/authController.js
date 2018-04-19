const User = require('./../models/User');

const registrationController = {
  registrationView: function (req, res, next) {
    res.render('auth/registration');
  },
  registration: function (req, res, next) {
    console.log(req.body);
    if (req.body.email &&
      req.body.password) {
      var userData = {
        email: req.body.email,
        password: req.body.password,
      }
      //use schema.create to insert data into the db
      User.create(userData, (err, user) => {
        if (err) {
          return next(err)
        } else {
          return res.redirect('/');
        }
      });
    } else {
      res.send('oops');
    }
  },
  loginView: function (req, res, next) {
    res.render('auth/login');
  },
  login: function (req, res, next) {
    User.authenticate(req.body.email, req.body.password, (error, user) => {
      if (error || !user) {
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  },
}

module.exports = registrationController;