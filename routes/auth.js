const router = require('express').Router()  //Router ??
const cors = require('cors')
const { json } = require('express')
const User = require('../model/User')
const { authSchema } = require('../model/validationSchema')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
//const { registerValidation } = require('../model/validationSchema') 
//const { loginValidation } = require('../model/validationSchema') 





//const hardPassword = qwerty

//const salt = bcrypt.genSalt(10)
//const hashPassword = bcrypt.hash(hardPassword, salt)

//console.log(hashPassword)


router.use(cors())

/*const mongoose = require('mongoose') */

/* DB_CONNECT = mongodb+srv://AdminMongoDB:AdminMongoDB2018@cluster0.m433z.mongodb.net/<dbname>?retryWrites=true&w=majority */

// router.post('/register', (req,res) =>{  // Simple request Tester on route /register <-- cette requete fomctionne nickel
//     res.send('it should work')
// })

//INPUT VALIDATION WITH HAPI/JOI MODULE:
// const Joi = require('@hapi/joi') 

// const schema = Joi.object( {
//     email: Joi.string()
//         .min(6)
//         .required()
//         .email(),

//     password: Joi.string()
//             .min(6)
//             .required()
// })   

router.post('/signup', async (req, res,/*next*/) => {  // route du tuto =  '/register' à changer en '/signup'   <-- register route a changer
    
// User data validation before creating a user:                        <-- Not working. Why ??

    // console.log('Joi.validate(req.body, schema)= ' + Joi.validate(req.body, schema))
    // const { error } = await schema.validateAsync(req.body, schema)
  
    // if(error) return res.status(400).send(error.details[0].message)

    // const user = new User({    /*req.body */
    //    email: req.body.email,
    //    password: req.body.password
    //   })
    //const {error} = registerValidation(reg.body)

      try {

        //Trying to validate Email without module:
        // const Email = await authSchema(req.body.email)
        // console.log(Email)
  
        // if (
        //   Email === "" ||
        //   Email == null ||
        //   Email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) == null
        // ) 
        // { res.send(`${isInvalideEmail} is not a valid Email`)
        // return}                                                 // <-- end of manual email validation.


        const result = await authSchema.validateAsync(req.body)
        console.log(result)
        let doesExist = await User.findOne({email : result.email})
        //console.log('doesExist = ' + doesExist)
        res.header("Access-Control-Allow-Origine","*")                 // <-- not necessary with core module installed ??
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        

         if(doesExist != null) {
             //console.log('Passe dans if doesExist')
             //throw createError.Conflict(`${result.email} is already been registred`)
             res.send(`${result.email} is already been registred`)
             return
          }

        // Let's hash the password:
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.email, salt)


        // Create the new user if it's a new email as req.body.email :
        const user = new User({
          email: req.body.email,
          password: hashPassword
        })
        const savedUser = await user.save()
        
        //res.send({message:"User created !"})

        // res.send(JSON.parse(
        //   '{message:"User created !"}'          // <-- seems to be ok. I need to make the login route
        //   ))

        //res.status(200).json({"message": "User created !"});
         
        res.send({user:user.email, message:"user created"}) // <-- send back user credencial
              
        }catch  (error)  {
          console.log(error)
            if (error.isJoi === true) error.status = 422
          console.log(error)
          res.status(400).send(error) 
        }     
        return                          // type de reponse attendu : { message: string } ??
    })          
    


/**************************************************route de login*****************************************************************************/


// bcrypt.compare(req.body.password,user[0].password).then((result)=>{
//   if(result){
//     console.log("authentication successful")
//     // do stuff
//   } else {
//     console.log("authentication failed. Password doesn't match")
//     // do other stuff
//   }
// })
// .catch((err)=>console.error(err))



    router.post('/login', async (req, res) => { // <-- login route   
    
      //const result = await authSchema.validateAsync(req.body)
      //console.log(result)
      let doesExist = await User.findOne({email : req.body.email})
      console.log('doesExist= '+ doesExist)
      res.header("Access-Control-Allow-Origine","*")                 // <-- not necessary with core module installed ?? it seems yes...
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      

    if(doesExist == null) {  
      console.log('Pass in if doesExist=null')
      return res.send('Email is not registred yet') 
    }  //<-- why does the script continu and why it doesn't send the response
     
    // const salt = await bcrypt.genSalt(10)
    // const hashPasswordFromWebPage = await bcrypt.hash(req.body.password, salt)
    // console.log('hashPasswordFromWebPage= '+ hashPasswordFromWebPage)

    let hashedPasswordFromDB = doesExist['password']
    console.log('hashedPasswordFromDB= '+hashedPasswordFromDB)
    console.log('raw password= ' + req.body.password)

    //let matchingPassword = bcrypt.compare(req.body.password, hashedPasswordFromDB)
    //console.log('matchingPassword'+ matchingPassword)
    let cleanPassword = req.body.password
    console.log('cleanPassword= '+ cleanPassword)
    let bcryptResult = await bcrypt.compare("lollol",hashedPasswordFromDB)  //, function(err,res){
    console.log('bcryptResult= '+ bcryptResult)
    // if(true)
    //         { console.log('Pass in invalide password')
    //           //res.send('Password invalide')
    //         } 
    
    //      else {
    //          console.log('Correct Password')
    //           //res.send('Correct Password') 
    //         }
    // })

    res.send('Email is already registred')
  
    
        //Checkin if the hash of the password with the user password in the DB :
        //const user = await User.findOne({email : req.body.email})
        //console.log(user)
        //console.log(req.body)

        // 
        // console.log(validPassword)
        //console.log('req.body.password= ' + req.body.password)
        //console.log('user.password' + user.password)
        //   if(!validPassword) return res.status(400).send('Invalide Password')

          //res.send({userId: user._id, token:"user logged in"})

          //Create and assign web token
          //const token = jsonwebtoken.sign({_id: user._id}, process.env.TOKEN_SECRET)
          //res.header('auth-token',token).send(token)


          // try {

                  
          //   } catch (error) {
          //     console.log(error)
          //       if (error.isJoi === true) error.status = 422
          //     console.log(error)
          //     res.status(400).send(error) 
          //   }                                  
        })        
        
module.exports = router







