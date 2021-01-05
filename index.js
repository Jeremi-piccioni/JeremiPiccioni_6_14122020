const express =require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Import Routes
const authRoute = require('./routes/auth')
const User = require('./model/User')

dotenv.config()

// cle pour connection a la BD local : 'mongodb://localhost:27017/pecockoLocal'
// cle pour la MongoDB dans le cloud : 'mongodb+srv://AdminMongoDB:AdminMongoDB2018@cluster0.m433z.mongodb.net/Cluster0?retryWrites=true&w=majority'    

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    //{ useUnifiedTopology: true },  // Ou faut il coller cette objet pour ne plus avoir le warning ?
    (err)=> {console.log('erreur de connection à la DB : '+ err)

   // User.create({                          // a decommenter pour créer un user.
   // "email": "hop@bob.com",
   // "password": "bob123"
   // })
   }
  ) 

// Middleware
app.use(express.json())

//Route Middleware
app.use('/api/auth', authRoute)     // route à changer par : '/api/auth'    route du tuto : '/api/user'

// Setting up listening port
app.listen(3000, () => console.log('Back End server running smoothly'))








