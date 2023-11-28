const express = require('express')
const validateToken = require('../middleware/validateToken')
const imageRouter = express.Router()
const { upImage, removeImage,getImage } = require("../controllers/image.controller")
const multer = require("../middleware/multer")


imageRouter.route("/:id")
.post(multer.single("image"),upImage)


imageRouter.route("/")
.get(getImage)

imageRouter.route("/:id")
.delete(removeImage)


module.exports = imageRouter
