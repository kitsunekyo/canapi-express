const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController');
const authMiddleware = require('./../middleware/authMiddleware');

router.get('/registration', authController.registrationView);
router.post('/registration', authController.registration)

router.get('/login', authController.loginView);
router.post('/login', authController.login);

router.get('/', authMiddleware.guard, (req, res, next) => {
    res.render('dashboard')
});


module.exports = router;