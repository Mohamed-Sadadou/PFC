const router = require('express').Router();
const AdminController =  require('../Controller/Admin.Controller');
const SujetController = require('../Controller/Sujet.Controller');
const midauth = require('../middleware/auth.middleware')
const Chek= require('../middleware/auth.middleware'); 


//pour CreeSujetInterne

router.post("/ModifierTitre",SujetController.modifierTitreE);

router.post("/ModifierDescription",SujetController.modifierDescriptionE);

router.post("/ModifierTauxAvancement",SujetController.modifiertauxAvancementE);

router.post("/SupprimerSujet",SujetController.SupprimerSujet);


module.exports = router;