const express = require('express');
const { createController, getAllPostsController, getRecipe } = require('../controllers/recipeController');

//ROUTER OBJECT
const router = express.Router();

//ROUTES
// POST || CREATE
router.post('/create-recipe', createController);

// GET POSTS
router.get('/get-recipes', getAllPostsController);

// GET POST
router.get('/get-recipe/:recipeid', getRecipe);

module.exports = router;