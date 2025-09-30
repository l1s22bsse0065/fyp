const express = require('express');
const { signup, login, getMe , updateUser} = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getMe);
router.patch('/me', auth, updateUser);
module.exports = router;
