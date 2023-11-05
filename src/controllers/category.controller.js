const {Categorie} = require("../models")

const getAll = async (req, res) => {
    try {
    const categories = await Categorie.findAll()
    return res.status(200).json(categories) 
    } catch (error) {
    return res.sendStatus(400)
    }
}

const createCategory = async (req, res) => {
    try {
       const {role} = req.user
       const nameCategory = req.body
       if(role != "admin") return res.status(403)
       await Categorie.create(nameCategory)
       return res.sendStatus(201)
    } catch (error) {
       return res.sendStatus(404)
    }
}


const deleteCategory = async (req, res) => {
    try {
      const {id} = req.params  
      const {role} = req.user
      if(role != "admin") return res.sendStatus(403)   
      const isDelete = await Categorie.destroy({where:{id}})
      return res.sendStatus(200)
    } catch (error) {
       return res.sendStatus(400) 
    }
}


const updateCategory = async (req, res) => {
    try {
       const {id} = req.params
       const {role} = req.user
       if(role != "admin") return res.sendStatus(403)   
       const values = req.body
       const isEdited = await Categorie.update(values,{where:{id},returning:true})
       return res.status(200).json(isEdited[0] == 1 ? {mgs: "updated"} : {mgs:"noUpdated"})
    } catch (error) {
       return res.sendStatus(400)
    }
}

module.exports = {
    getAll,
    createCategory,
    deleteCategory,
    updateCategory
}