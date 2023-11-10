const express = require('express')
const validateToken = require('../middleware/validateToken')
const googleRouter = express.Router()
const passport = require("passport")


googleRouter.route("/")
.get(passport.authenticate("google", {scope:["profile", "email"]}))


googleRouter.route('/redirect')
.get( passport.authenticate('google', { failureRedirect: 'http://localhost:5173/welcome/register'}),(req,res) => {
  res.redirect("http://localhost:5173")
})




module.exports = googleRouter