const recipeModel = require('../models/recipeModel');
const { uploadImage, deleteImage } = require('../config/cloudinary');
const fs = require('fs-extra');


// Controlador para crear una nueva receta con o sin imagen
const createController = async (req, res) => {
        try {
            const { title, ingredients, category } = req.body;

            //validation
            if(!title){
                return res.status(500).send({
                    success: false,
                    message: 'Por favor añade un titulo'
                })
            }
            if(!ingredients || ingredients.length === 0){
                return res.status(500).send({
                    success: false,
                    message: 'Por favor añade minimo un ingrediente'
                })
            }
            // Crea una nueva receta
            const recipe = recipeModel({
                title,
                ingredients,
                category,
                postedBy: req.auth._id,
            });

            // almacena en la db
            const recipeStored = await recipe.save();

            return res.status(201).json({
                success: true,
                message: 'Recipe created successfully',
                recipeStored,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error creating recipe',
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

const deleteRecipeController = async (req,res) => {
    try {
        const {id} = req.params;
        console.log('id',id)
        const recipeDelete = await recipeModel.findByIdAndDelete({_id:id});

        //Si no se encuentra el id en la lista
        if(!recipeDelete) return res.status(404).json({
            success: false,
            message: 'Receta no existe',
        });

        //Si existe una imagen la borra
        if(recipeDelete.image?.public_id){
            await deleteImage(recipeDelete.image.public_id)
        }
        console.log('recipeDelete',recipeDelete)

        res.status(200).send({
            success: true,
            message: 'Tu receta ha sido eliminada',
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in delete post API'
        })
    }
};

module.exports = { createController, getAllPostsController, getRecipe, getUserPostsController, deleteRecipeController};