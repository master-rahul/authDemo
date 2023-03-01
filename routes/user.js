const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passport = require('../config/passport_local_strategy');

router.get('/signIn', passport.redirectProfile ,userController.signIn);
router.get('/signUp', passport.redirectProfile, userController.signUp);
router.get('/profile', passport.checkAuthentication ,userController.profile);
router.post('/add', userController.add);



module.exports = router;