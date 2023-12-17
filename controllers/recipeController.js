// const JWT = require('jsonwebtoken');
// const { hashPassword, comparePassword } = require("../helpers/authHelper");
// const { expressjwt: jwt } = require('express-jwt');
const recipeModel = require('../models/recipeModel');

//Creation recipe
const createController = async (req,res) => {
    try {
        const {title,ingredients,preparation} = req.body;
        console.log(req.body)
        //validation
        if(!title){
            return res.status(400).send({
                success: false,
                message: 'title is required'
            });
        }
        // if(ingredients.length === 0){
        //     return res.status(400).send({
        //         success: false,
        //         message: 'ingredients is required'
        //     });
        // }

        //save recipe
        const recipe = await recipeModel({
            title,
            ingredients,
            preparation,
            postedBy: req.auth._id,
        }).save();
        console.log('req',req)
        console.log('recipe',recipe)

        return res.status(201).send({
            success: true,
            message: 'Creation Successfully',
            recipe
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in creation API',
            error,
        });
    }
};

//GET ALL POSTS
const getAllPostsController = async (req,res) => {
    try {
        const posts = await recipeModel.find()
        console.log('posts',posts)
        res.status(200).send({
            success: true,
            message: 'All Posts Data',
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in GetAllPostsApi',
            error
        })
    }
};

//Details Recipe
const getRecipe = async (req, res) => {
    try {
        const recipeId = req.params.recipeid; // paso este elemento por la url
        const recipe = await recipeModel.findById(recipeId);

        if (!recipe) {
            return res.status(404).send({
                success: false,
                message: 'Recipe not found',
            });
        }

        console.log('Recipe', recipe);
        res.status(200).send({
            success: true,
            message: 'Recipe Data',
            recipe,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getRecipe API',
            error,
        });
    }
};

//Get Recipe by author
const getUserPostsController = async (req,res) => {
    try {
        const userPosts = await recipeModel.find({postedBy: req.auth._id});
        res.status(200).send({
            success: true,
            message: 'user posts',
            userPosts
        })
        console.log('userPosts',userPosts)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in user POST APi'
        })
    }
}


//UpdateUser
// const updateUserController = async (req,res) => {
//     try {
//         const {name,password,email} = req.body;
//         //user find
//         const user = await userModel.findOne({email});
//         //password validate
//         if(password && password.length < 6){
//             return res.status(400).send({
//                 success: false,
//                 message: 'Password is required and should be 6 character long'
//             })
//         }
//         const hashedPassword = password ? await hashPassword(password) : undefined;
//         //updated user
//         const updatedUser = await userModel.findOneAndUpdate({email}, {
//             name: name || user.name,
//             password: hashedPassword || user.password
//         },{new:true})
//         updatedUser.password = undefined;
//         res.status(200).send({
//             success: true,
//             message: 'Profile updated please Login',
//             updatedUser
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: 'Error In User Update Api',
//             error
//         })
//     }
// }

module.exports = { createController, getAllPostsController, getRecipe, getUserPostsController};