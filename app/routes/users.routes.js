const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');

//register account
router.post('/register' , user.register );
router.post('/login' , user.login );


module.exports = router;