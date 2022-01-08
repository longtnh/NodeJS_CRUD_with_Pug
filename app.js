const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

//router
const studentRouter = require('./router/StudentRouter')

const port = app.get('port') || 3000

//connect to db
mongoose.connect('mongodb://localhost/nodejs_with_pug', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to Database'))

app.use('/student', studentRouter)

app.listen(port, () => console.log(`Server is listening in port ${port}`))