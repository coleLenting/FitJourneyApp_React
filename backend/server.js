require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const goalsRoutes = require('./routes/goals')

const app = express(); //creating an express app

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use(express.json())
app.use('/api/goals', goalsRoutes)
// connect to db 
mongoose.connect(process.env.MONG_URI)
.then(() => {app.listen(process.env.PORT, () => {
    console.log('connected to DB listening on PORT', process.env.PORT)  //listening for HTTP requests
})})
.catch((error) => {
console.log(error)
})

