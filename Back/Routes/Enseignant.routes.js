const router = require('express').Router();
const AdminController =  require('../Controller/Admin.Controller');
const SujetController = require('../Controller/Sujet.Controller');
const midauth = require('../middleware/auth.middleware')
//const Chek= require('../middleware/auth.middleware'); 

const ModificationRoute = require('./ModificationSujet.routes');

const JuryRoute = require('./Jury.routes');
const ResponsableRoute = require('./Responsable.routes');
const CommissionRoute = require('./Commission.routes');

const ChekRole =  require('../middleware/RoleEnseignant.middleware');
const TableauDeBord=require('../routes/TableauDeBord.routes')
const etudiantController = require('../Controller/Etudiant.Controller');
//pour CreeSujetInterne

//******* Creer une sujet interne (proposé) *******/

router.post("/ProposerSujet",SujetController.CreeSujetinterne);

//******* modifier sujet interne (proposé) *******/

router.use("/modifiersujet",ModificationRoute);

//******* Affecter un binome a un sujet interne (proposé) *******/

router.post("/AffectationBinome",SujetController.AffecterBinome);

//******* afficher les sujets interne (proposé) de l'enseignant connecté *******/

router.post("/donnemessujet",SujetController.GetSujetEnseignant);


//*********** */

router.use('/TableauDeBord',TableauDeBord);
router.use("/Jury",JuryRoute);
router.use("/ResponsableDeSpecialite",ResponsableRoute);
router.use("/Commission",CommissionRoute);





module.exports = router;