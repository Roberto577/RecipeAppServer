const express = require('express');
const { createController } = require('../controllers/minutaController');

//ROUTER OBJECT
const router = express.Router();

//ROUTES
// POST || CREATE
router.post('/create-minuta', createController);

// GET POSTS
// router.get('/get-recipes', getAllPostsController);

// // GET POST
// router.get('/get-recipe/:recipeid', getRecipe);

module.exports = router;