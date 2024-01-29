// const JWT = require('jsonwebtoken');
// const { hashPassword, comparePassword } = require("../helpers/authHelper");
// const { expressjwt: jwt } = require('express-jwt');
const minutaModel = require('../models/minutaModel');

// //middleware
// const requireSingIn = jwt({
//     secret: process.env.JWT_SECRET, algorithms: ['HS256']
// })

//Creation minuta
const createController = async (req,res) => {
    try {
        const {rangoFecha,dias} = req.body;        
        //validation

        //save minuta
        const minuta = await minutaModel({
            rangoFecha,
            dias
        }).save();

        return res.status(201).send({
            success: true,
            message: 'Creation minuta Successfully',
            minuta
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in creation minuta API',
            error,
        });
    }
};

//GET ALL POSTS
// const getAllPostsController = async (req,res) => {
//     try {
//         const posts = await recipeModel.find()
//         console.log('posts',posts)
//         res.status(200).send({
//             success: true,
//             message: 'All Posts Data',
//             posts
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: 'Error in GetAllPostsApi',
//             error
//         })
//     }
// };

// const getRecipe = async (req, res) => {
//     try {
//         const recipeId = req.params.recipeid; // paso este elemento por la url
//         const recipe = await recipeModel.findById(recipeId);

//         if (!recipe) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'Recipe not found',
//             });
//         }

//         console.log('Recipe', recipe);
//         res.status(200).send({
//             success: true,
//             message: 'Recipe Data',
//             recipe,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error in getRecipe API',
//             error,
//         });
//     }
// };

module.exports = { createController};