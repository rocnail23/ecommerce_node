const { User, Code, Cart,WishList,Product } = require('../models')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/nodeMail')
const jwt = require('jsonwebtoken')
const { Model } = require('sequelize')

const createUser = async (req, res) => {
  try {
    const { name, password, email, urlBase } = req.body
    const body = { name, password, email }
    body.password = await bcrypt.hash(password, 10)
    const result = await User.create(body)
    const code = require('crypto').randomBytes(64).toString('hex')
    const url = `${urlBase}/verify_email/${code}`
    const send = await sendEmail({
      to: email,
      subject: 'verificacion de cuenta',
      html: `<div><h1> verifica tu cuenta<h1/>
                    <a href="${url}"> has click aqui para verificar tu usuario<a/><div/>`
    })
    console.log('result.id')
    const emailcode = {
      code,
      user_id: result.id
    }
    await Code.create(emailcode)
    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ mgs: error })
  }
}

const getCode = async (req, res) => {
  try {
    const { id } = req.params
    const result = await Code.findOne({
      where: { id },
      include: [
        {
          model: User
        }
      ]
    })
    console.log('hey')
    return res.status(200).json({ result })
  } catch (error) {
    return res.status(400)
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params                            
   
    

    const result = await User.findByPk(id, {
      include: [
        {
          model:Cart,
          attributes:{ exclude:["user_id","createdAt","updatedAt"]},
        },
        {
          model:WishList,
          attributes:{ exclude:["user_id","createdAt","updatedAt"]},
          include:Product
        }
      ]
    })

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400)
  }
}

const verifyCode = async (req, res) => {
  try {
    const { code } = req.params
    console.log(req.params)
    const emailcode = await Code.findOne({ where: { code } })
    console.log(emailcode)
    if (!emailcode) return res.sendStatus(401)
    const body = {
      isValid: true
    }
    const id = emailcode.user_id
    await User.update(body, {
      where: { id },
      returning: true
    })

    await WishList.create({user_id:id})
    console.log("hojana")
    await Cart.create({user_id: id})

  

    emailcode.destroy()
    return res.status(200).json({ mgs: 'user validated' })
  } catch (error) {
    return res.status(400).json({ mgs: 'ups error' })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const resData = await User.destroy({ where: { id } })
    return res.json(resData)
  } catch (error) {
    return res.status(400).json({ mgs: 'ups error' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) return res.status(404).json({mgs:"invalid email"})

    if (user.isValid == false) return res.sendStatus(401)

    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) return res.sendStatus(401)
    console.log('aqui estamos a la vuelta')

    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email
    }

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '2h'
    })

    return res.status(201).json({ token, user })
  } catch (error) {
    return res.status(400)
  }
}

const renewToken = async (req, res) => {
  console.log('renocandfo')
  try {
    const { name, email, role } = req.user
    console.log(req.user)
    const payload = {
      name,
      email,
      role
    }

    console.log(payload)

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '2h'
    })
    console.log(token)
    return res.status(200).json({ token })
  } catch (error) {
    return res.status(400)
  }
}

const updateUser = async (req,res) => {
  try {
      const {id} = req.params
      const value = req.body
      await User.update(value,{where:{id},returning:true})
      console.log("mama")
    return  res.status(200).json({mgs:"good"})
  } catch (error) {
      return res.status(400)
  }
}

module.exports = {
  createUser,
  verifyCode,
  loginUser,
  deleteUser,
  getUser,
  getCode,
  renewToken,
  updateUser
}
