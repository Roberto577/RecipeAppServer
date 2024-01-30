const express = require('express');
const { requireSingIn } = require('../controllers/userController');
const { createController, getUserMinutaByAuthorAndEqualsDateController } = require('../controllers/minutaController');

//ROUTER OBJECT
const router = express.Router();

//ROUTES
// POST || CREATE
router.post('/create-minuta', requireSingIn, createController);

//GET Minuta BY AUTHOR
router.get('/get-user-minutas', requireSingIn, getUserMinutaByAuthorAndEqualsDateController);


// GET POSTS
// router.get('/get-recipes', getAllPostsController);

// // GET POST
// router.get('/get-recipe/:recipeid', getRecipe);

module.exports = router;