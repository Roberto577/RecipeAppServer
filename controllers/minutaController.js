// const JWT = require('jsonwebtoken');
// const { hashPassword, comparePassword } = require("../helpers/authHelper");
// const { expressjwt: jwt } = require('express-jwt');
const minutaModel = require('../models/minutaModel');

const { format, startOfWeek, endOfWeek } = require('date-fns');
const { es } = require('date-fns/locale');

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
            dias,
            postedBy: req.auth._id,
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

//Get minuta by author and equals Date
//Solo envia las minutas que sean del author y que ademas tenga el mismo rango de fecha
const getUserMinutaByAuthorAndEqualsDateController = async (req, res) => {
    try {
        // Calcula el rango de fechas de la semana actual
        // Obtener la fecha actual
        const currentDate = new Date();
    
        // Obtener el inicio y fin de la semana actual
        const options = { weekStartsOn: 1 }; // 1 indica que la semana debe comenzar en lunes
        const startDate = startOfWeek(currentDate, options);
        const endDate = endOfWeek(currentDate, options);
    
        // Formatear las fechas en el formato deseado
        const formattedStartDate = format(startDate, 'd MMM. yyyy', { locale: es });
        const formattedEndDate = format(endDate, 'd MMM. yyyy', { locale: es });
    
        // Crear el texto del rango de fechas de la semana
        const calculatedWeekDateRange = `Semana ${formattedStartDate} - ${formattedEndDate}`;

        // Busca todas las minutas del usuario
        const userMinutas = await minutaModel.find({ postedBy: req.auth._id });

        // Filtra las minutas para obtener solo la de la semana actual
        const minutaSemanaActual = userMinutas.find(minuta => minuta.rangoFecha === calculatedWeekDateRange);

        if (minutaSemanaActual) {
            res.status(200).send({
                success: true,
                message: 'Minuta de la semana actual encontrada',
                minutaSemanaActual
            });
        } else {
            res.status(200).send({
                success: true,
                message: 'No se encontró ninguna minuta para la semana actual',
                minutaSemanaActual: {}
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error en la API al obtener la minuta del usuario'
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

module.exports = { createController, getUserMinutaByAuthorAndEqualsDateController };