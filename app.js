const express = require('express')
const app = express()

// Setting the listening port
app.listen(3000,()=> console.log('BACK DANS LES BACS BABY !!'))

// Routes 

app.get('/',(req,res)=>{
  res.send('we are back dans les bacs')
}
)




