const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')




//Fonction pour la génération d'un token 
const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' })

const registerUser = asyncHandler(async (req, res) => {
    const {nom , email , password } = req.body 

    if(!nom || !email || !password){
        res.status(400)
        throw new Error('Tout les champs sont obligatoires')
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('Cet utilisateur existe déjà dans la base de données')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash( password , salt)

    const user = await User.create({ nom , email , password : hashedPassword })

    if(user){
        res.status(200)
        res.json({ _id : user.id ,nom : user.nom , email : user.email , token : generateJWTtoken(user._id) })
    } else {
        res.status(400)
        throw new Error('Données invalides !')
    }
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body 
    const user = await User.findOne({email})

    if(user && ( await bcrypt.compare( password , user.password ) ) ){
        res.json({ _id : user._id , nom : user.nom , email : user.email , token : generateJWTtoken(user._id)})
    } else {
            res.status(400)
            throw new Error('Données invalides') 
    }
 })


const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id, nom, email } = await User.findById(req.user.id)
res.status(200).json({ id: _id, nom, email })
})
 

module.exports = { registerUser, loginUser, getCurrentUser }  