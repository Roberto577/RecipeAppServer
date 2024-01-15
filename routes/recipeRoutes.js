const express = require('express');
const fileUpload = require('express-fileupload');

const { requireSingIn } = require('../controllers/userController');
const { createController, getAllPostsController, getRecipe, getUserPostsController, deleteRecipeController } = require('../controllers/recipeController');


//ROUTER OBJECT
const router = express.Router();

//ROUTES
// POST || CREATE
router.post('/create-recipe',
    requireSingIn,
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads'
    }),
    createController);

// GET POSTS
router.get('/get-recipes', getAllPostsController);

// GET POST || Details recipe
router.get('/get-recipe/:recipeid', getRecipe);

//GET RECIPE BY AUTHOR
router.get('/get-user-recipes', requireSingIn, getUserPostsController);

//DELETE RECIPE
router.delete('/delete-recipe/:id', requireSingIn, deleteRecipeController);

module.exports = router;