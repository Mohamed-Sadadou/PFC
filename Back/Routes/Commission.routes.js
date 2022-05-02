const router = require('express').Router();
const EnseignantController = require("../Controller/Enseignant.Controller");
const SujetController = require("../Controller/Sujet.Controller");




router.post("/ConsulteSujet",SujetController.ToutSujet);
router.post("/ValiderSujet",SujetController.ValiderSujet);
router.post("/AjoutFicheValidation",EnseignantController.RempliFicheValidation);
module.exports = router;
