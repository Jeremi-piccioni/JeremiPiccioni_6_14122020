const express =require('express')
const app = express()
const dotenv = require('dotenv')

const mongoose = require('mongoose')

// Import Routes
const authRoute = require('./routes/auth')
const User = require('./model/User')

dotenv.config()


// mongodb+srv://AdminMongoDB:<password>@cluster0.m433z.mongodb.net/<dbname>?retryWrites=true&w=majority // connection Password string
// DB_CONNECT = mongodb+srv://AdminMongoDB:<password>@cluster0.m433z.mongodb.net/<dbname>?retryWrites=true&w=majority
// cle pour connection a la BD local : 'mongodb://localhost:27017/pecockoLocal'
    

//contect to Mongo DB
console.log('CloudMongoDBSting='+ process.env.DB_CONNECT)
  
//mongoose.connect('mongodb+srv://AdminMongoDB:AdminMongoDB2018@cluster0.m433z.mongodb.net/Cluster0?retryWrites=true&w=majority',

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    //{ useUnifiedTopology: true },  // Ou faut il coller cette objet pour ne plus avoir le warning ?
   
    (err)=> {console.log('erreur de connection à la DB : '+ err)
    User.create({
        "email": "totooihsafoihfda@sds.com",
        "password": "1223345656"
})}) 

// Middleware
app.use(express.json())

// Setting up listening port
app.listen(3000, () => console.log('Back End server running smoothly'))

//Route Middleware
app.use('/api/user', authRoute)     // route à changer par : /api/auth






