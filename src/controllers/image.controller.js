const {uploadToCloudinary,destroyFromCloudinary} = require("../middleware/cloudinary")
const {Image} = require("../models")

const upImage = async (req, res) => {
    try {
      const {path,filename} = req.file
      const {id} = req.params
      console.log({path,filename})
       const {secure_url,public_id} = await uploadToCloudinary(path, filename)
       console.log("this are de dates",secure_url,public_id)
       
        console.log("imageeen")
        return res.status(200).json()
    } catch (error) {
        return res.status(400)
    }

}

const removeImage = async (req,res) => {
    try {
    const {id} = req.params
    
    const image = await Image.findByPk(id)
    const cloudResponse = await  destroyFromCloudinary(image.name)
    await image.destroy()
     
     return res.status(200).json(cloudResponse)
    
    } catch (error) {
        return res.sendStatus(400)
    }
}


module.exports = {
    upImage,
    removeImage
}