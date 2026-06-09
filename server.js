const express = require('express')
const { errorHandler } = require('./middleware/errorHandler')
const connectDB = require('./connection/dataBase')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()

//Configuration pour utiliser le json  
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use('/v1/tache' , require("./routes/tache") )
 
app.use('/v1/user', require('./routes/user'));

//Lancement d'une connexion à la base de donnée depuis le serveur
connectDB()
 
app.use(errorHandler)
app.listen(port , ()=>{
    console.log("Serveur en écoute sur le port" , port)
})
