const express = require('express');
const { signup, login, getMe , updateUser, toggleFavourite,
  getFavourites} = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getMe);
router.patch('/me', auth, updateUser);
router.post("/favourites/:recipeId", auth, toggleFavourite);
router.get("/favourites", auth, getFavourites);
module.exports = router;
