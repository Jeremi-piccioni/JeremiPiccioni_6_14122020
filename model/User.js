const mongoose = require('mongoose')

// Corps de la demande :   <-- est-ce vraiment la structure a envoyer ????

// { email:
// string,
// password:
// string }

const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      min: 6,
      max: 255
      },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  }     
})

module.exports = mongoose.model('User', userSchema)
