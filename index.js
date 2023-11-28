const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./src/db/connectDb')
const path = require("path")
const helmet = require('helmet');
const cookieSession = require("cookie-session");
const passport = require("passport")
const passportStrategy = require("./src/utils/passport")
const app = express()

const Port = process.env.PORT || 4000

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);



app.use(function(request, response, next) {
  if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb) => {
          cb()
      }
  }
  if (request.session && !request.session.save) {
      request.session.save = (cb) => {
          cb()
      }
  }
  next()
})

app.use(passport.initialize())
app.use(passport.session())



app.use(express.static(path.join(__dirname, ".", "src", "public")))
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(express.json())


app.use(cors({
  credentials: true,
  origin: "https://main--jazzy-gelato-f6181a.netlify.app"
}))



app.use('/api/v1', require('./src/routes'))

app.get('/', (req, res) => {
  return res.send('Welcome to express!')
})

connectDb()

app.listen(Port, (req, res) => {
  console.log('listening in the port', Port)
})
