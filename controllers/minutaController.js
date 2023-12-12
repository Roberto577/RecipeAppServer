// const JWT = require('jsonwebtoken');
// const { hashPassword, comparePassword } = require("../helpers/authHelper");
// const { expressjwt: jwt } = require('express-jwt');
const minutaModel = require('../models/minutaModel');

// //middleware
// const requireSingIn = jwt({
//     secret: process.env.JWT_SECRET, algorithms: ['HS256']
// })

//Creation recipe
const createController = async (req,res) => {
    try {
        const {selectedRecipes} = req.body;
        const Lunes = selectedRecipes.Lunes;
        const Martes = selectedRecipes.Martes;
        const Miercoles = selectedRecipes.Miercoles;
        const Jueves = selectedRecipes.Jueves;
        const Viernes = selectedRecipes.Viernes;
        const Sabado = selectedRecipes.Sabado;
        const Domingo = selectedRecipes.Domingo;
        
        console.log('selectedRecipes',selectedRecipes)
        //validation
        if(selectedRecipes.Lunes.title == null){
            return res.status(400).send({
                success: false,
                message: 'Lunes is required'
            });
        }
        if(selectedRecipes.Martes.title == null){
            return res.status(400).send({
                success: false,
                message: 'Martes is required'
            });
        }
        if(selectedRecipes.Miercoles.title == null){
            return res.status(400).send({
                success: false,
                message: 'Miercoles is required'
            });
        }
        if(selectedRecipes.Jueves.title == null){
            return res.status(400).send({
                success: false,
                message: 'Jueves is required'
            });
        }
        if(selectedRecipes.Viernes.title == null){
            return res.status(400).send({
                success: false,
                message: 'Viernes is required'
            });
        }

        //save minuta
        const minuta = await minutaModel({
            Lunes,
            Martes,
            Miercoles,
            Jueves,
            Viernes,
            Sabado,
            Domingo,
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