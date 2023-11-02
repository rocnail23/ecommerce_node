const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./src/db/connectDb')


const app = express()

const Port = process.env.PORT || 4000

app.use(express.json())

app.use(cors())

app.use('/api/v1', require('./src/routes'))

app.get('/', (req, res) => {
  return res.send('Welcome to express!')
})

connectDb()

app.listen(Port, (req, res) => {
  console.log('listening in the port')
})
