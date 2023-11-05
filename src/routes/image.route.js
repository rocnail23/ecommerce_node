const express = require('express')
const validateToken = require('../middleware/validateToken')
const imageRouter = express.Router()
const { upImage, removeImage, } = require("../controllers/image.controller")
const multer = require("../middleware/multer")


imageRouter.route("/")
.post(multer.single("image"),upImage)

imageRouter.route("/:id")
.delete(removeImage)


module.exports = imageRouter
