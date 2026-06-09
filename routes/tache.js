const express = require('express')
const { recupTache, createTache, updateTache, supTache } = require('../controllers/tacheController')
const router = express.Router()
const { protect } = require('../middleware/auth')


//Récupérer et Lire les tâches
router.get("/" ,  protect ,recupTache)

//Créer les tâches
router.post("/"  ,  protect , createTache)

//Mise à jour des tâches
router.put("/:id" ,  protect , updateTache)

//Suppression des tâches
router.delete( "/:id" ,  protect , supTache)

module.exports = router 