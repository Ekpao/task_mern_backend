const mongoose = require('mongoose')


const tacheSchema = mongoose.Schema(
{
texte : { type: String, required: [true, 'Veillez saisir une tâche...!'] } ,
user: { type: mongoose.Schema.Types.ObjectId, required: true , ref: 'User'}
},
{
timestamps: true
}
)

module.exports = mongoose.model("Tâche" , tacheSchema)