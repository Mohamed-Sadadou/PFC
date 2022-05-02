const router = require('express').Router();
const EnseignantController = require('../Controller/Enseignant.Controller');

router.post("/RempliFicheEvaluation",EnseignantController.RempliFicheEvaluation);
router.post("/NoteFinaleSujet",EnseignantController.NoteFinal);
router.post('/ConsulteFiche',EnseignantController.ConsulteFicheEvaluation);

module.exports = router;
