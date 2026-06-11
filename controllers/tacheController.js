const Tache = require('../models/tacheModels')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const recupTache = asyncHandler( async(req , res)=>{
    const taches = await Tache.find({user : req.user.id })
    res.status(200).json(taches)
})

const createTache = asyncHandler( async(req, res) => {
    if(!req.body.texte){
        res.status(400)
        throw new Error("Veillez écrire une tâche...")
    }
    const tache = await Tache.create({ texte : req.body.texte , user : req.user.id})
res.status(200).json( tache )
})

const updateTache = asyncHandler( async(req, res) => {
    
        const tache = await Tache.findById(req.params.id)
         if (!tache) {
        res.status(400)
        throw new Error('Task not found')
}
    const user = await User.findById(req.user.id)
        if(!user){
        res.status(401)
        throw new Error('Utilisateur non trouvé !')
}
        if (tache.user.toString() !== user.id) {
         res.status(401)
        throw new Error('L\'utilisateur n\'est pas autorisé à mettre à jour')
}

     const tacheUpdate = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true })
     
     res.status(200).json(tacheUpdate)
})

const supTache = asyncHandler( async(req, res) => {
    
    const tache = await Tache.findById(req.params.id)
     if (!tache) {
    res.status(400) 
    throw new Error('Task not found')
}
    const user = await User.findById(req.user.id)
       if(!user){
       res.status(401) 
      throw new Error('Utilisateur non trouvé ')
}
        if (tache.user.toString() !== user.id) {
       res.status(401)
       throw new Error("L'utilisateur n'est pas autorisé à effacer cette tâche")
}

      await Tache.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = { recupTache , createTache , updateTache , supTache }


// mongodb+srv://elouvaekpao_db_user:elou1919blend@cluster0.efb1odm.mongodb.net/