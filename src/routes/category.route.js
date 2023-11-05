const express = require("express")
const validateToken = require('../middleware/validateToken')
const categoryRouter = express.Router()
const {createCategory, deleteCategory, 
getAll, updateCategory} = require("../controllers/category.controller")


categoryRouter.route("/")
.get(getAll)
.post(validateToken, createCategory)

categoryRouter.route("/:id")
.put(validateToken, updateCategory)
.delete(validateToken, deleteCategory)

module.exports = categoryRouter
