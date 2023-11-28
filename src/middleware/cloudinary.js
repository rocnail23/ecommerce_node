const {v2 : cloudinary} = require('cloudinary')
const path = require("path")
const fs = require("fs")

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});




const uploadToCloudinary = async(localFilePath, filename) => {
    try {
        const folder = "ecommerce";

        console.log("estees el cloud name", process.env.CLOUD_NAME)

        const public_id = folder + "/" + path.parse(filename).name
        const result = await cloudinary.uploader.upload( 
           localFilePath, 
            { public_id,
               overwrite: true}
        )
        return result;
    } catch (error) {
        console.log(error)
       throw new Error("failed cloudinary")
    } finally {
        fs.unlinkSync(localFilePath)
    }
}

const destroyFromCloudinary =  async (public_id) => {

  cloudinary.uploader
  .destroy(public_id)
  .then(result => result)
  .catch(err => err)

}

module.exports ={
    uploadToCloudinary,
    destroyFromCloudinary
}