const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
  const token = req.headers.token
  if (!token) return res.sendStatus(401)

  jwt.verify(
    token,
    process.env.SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403)
      req.user = decoded
      next()
    }
  )
}

module.exports = verifyJWT
