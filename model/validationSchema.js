//INPUT VALIDATION WITH HAPI/JOI MODULE:
const Joi = require('@hapi/joi') 

//const registerValidation = data => {

    const authSchema = Joi.object( { 
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    })  
 // return Joi.validate(data,authSchema)
//}

//const loginValidation = data => {

    // const authSchema =  Joi.object( { 
    //     email: Joi.string()
    //         .min(6)
    //         .email()
    //         .required(),
    //     password: Joi.string()
    //         .min(6)
    //         .required()
    // } ) 
 // return Joi.validate(data,authSchema)
//}

module.exports = { authSchema }

//module.exports.registerValidation = registerValidation
//module.exports.loginValidation = loginValidation