const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

 router.use('/user', require('./user'));
 router.use('/session', require('./session'));
router.get('/', indexController.index);

module.exports = router;