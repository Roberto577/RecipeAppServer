const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'recipeImage'
    });
}

async function deleteImage(publicId) {
    return await cloudinary.uploader.destroy(publicId)
}

module.exports = { uploadImage };