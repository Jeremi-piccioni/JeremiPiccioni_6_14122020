const express =require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Import Routes
const authRoute = require('./routes/auth')

dotenv.config()


// mongodb+srv://AdminMongoDB:<password>@cluster0.m433z.mongodb.net/<dbname>?retryWrites=true&w=majority // connection Password string
// DB_CONNECT = mongodb+srv://AdminMongoDB:<password>@cluster0.m433z.mongodb.net/<dbname>?retryWrites=true&w=majority

//contect to Mongo DB

mongoose.connect("'" + process.env.DB_CONNECT + "'" ,
    { useNewUrlParser: true },
    //{ useUnifiedTopology: true },  // Ou faut il coller cette objet pour ne plus avoir le warning ?
    ()=> {console.log('Connected to MongoDB BABY !!')}) 

// Middleware
app.use(express.json())

//Route Middleware
app.use('/api/user', authRoute)     // route à changer par : /api/auth

// Setting up listening port
app.listen(3000, () => console.log('Back End server running smoothly'))




