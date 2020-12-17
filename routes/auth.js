const router = require('express').Router()  //Router ??
const User = require('../model/User')


router.post('/register', /*async*/(req, res) => {    //  /register à changer en /signup   <-- register route a changer
   
    const user = new User({    /*req.body */
       email: req.body.email,
       password: req.body.password
      })
      try {
          console.log('passe dans le try')
            const savedUser = /*await*/ user.save().then( (savedUser) => res.send(savedUser) )
         // console.log('passe dans le then')
                                                   .catch( (err) => res.status(400).send(err) ) 
          console.log('passe le catch apres le then')  
              
        }  catch (err) {
         res.status(400).send(err) 
        }                                  // type de reponse attendu : { message: string } ??
    })            
    
    
router.post('/register', (req,res) =>{  // Simple request Tester on route /register <-- cette requete fomctionne nickel
        res.send('it should work')
    })
               
module.exports = router






