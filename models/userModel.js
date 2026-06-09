const mongoose = require('mongoose')


const userSchema = mongoose.Schema(
{
    nom: {
    type: String,
    required: [true, 'Veille entrez votre nom...'],
},
    email: {
    type: String,
    required: [true, 'Veillez entrez votre email...'],
    unique: true,
},
    password: {
    type: String,
    required: [true, 'Veillez entrez votre mot de passe...'],
},
},
{ 
    timestamps: true 
}
)
module.exports = mongoose.model('User', userSchema)