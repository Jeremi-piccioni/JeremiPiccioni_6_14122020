const express = require('express')
const app = express()

// Setting the listening port
app.listen(3000)

app.get('/',(req,res)=>{
    res.send('we are homed')
  }
)
