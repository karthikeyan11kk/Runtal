const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.Cloud_name,
    api_key:process.env.Cloudinary_API_Key,
    api_secret:process.env.Cloudinary_API_Secret
});

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"Runtal",
        allowedFormats:["jpeg","jpg","png"]
    }  
})

module.exports={
    cloudinary,
    storage
}