const sujet = require('../Models/Sujet.Schema');
const sujetinterne = require('../Models/SujetInterne.Model');
const Utilisateur = require('../Models/Utilisateur.Model');
const sujetexterne = require('../Models/SujetExterne.Model');
const Sujet = require('../Models/SujetInterne.Model');
const ficheEvaluation = require('../Models/FicheEvaluation.Schema');
const ficheValidation = require('../Models/FicheValidation.Schema');
const Binome = require('../Models/Binome.Model');
const etu1 = require('../Models/Etudiant.Model');
const etu2 = require('../Models/Etudiant.Model');
const Notification = require('./Notification.Controller')
const jwt = require('jsonwebtoken');

//************* code sujet  ****************************************************************/

function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
}
function createCode(sujet) {


    return [createdate(), sujet.typeSujet[0].toUpperCase(), Math.floor(Math.random() * 100000), sujet.theme.replace(/ /g,"").toUpperCase()].join('');
}

//********************* Sujets Avec Binomes */

//*************** Cree Un Sujetinterne ( enseignant propose sujet ) *****************/

module.exports.CreeSujetinterne = async (req, res) => {

    console.log('on affiche le req  ', req.body);

    sujet.titre = req.body.titre;
    sujet.theme = req.body.theme;
    sujet.description = req.body.description;
    sujet.tauxAvancement = 0;
    sujet.rapportURL = '';
    sujet.typeSujet = 'interne';
    sujet.pris = false;
    sujet.Valide=false;
    sujet.niveau = req.body.niveau;
    sujet.code = createCode(sujet);

    const token = req.cookies.jwt;
    console.log('on chek ce token :', token);
    if (token) {
        jwt.verify(token, 'Token_secret_PFE', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                const sujeti = new sujetinterne({
                    sujet: sujet,
                    encadreur: decodedToken.userId,
                    universite: 'USTHB'

                });
                sujeti.save()
                    .then(() => {
                        console.log('lid est : ', sujeti._id);
                        console.log('notre sujet est la  : ', sujeti);
                        return res.status(201).json({ message: 'Sujet cree et sujet interne proposé  !' });
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        return res.status(404).json({ error: 'ta pas le droit frere' });
        //res.render('/');
        //next();
    }
}
//*************** Cree Un SujetExterne ( de l'admin ) *******************************/

module.exports.CreeSujetExterne = async (req, res) => {

    console.log('on affiche le req  ', req.body);



    Utilisateur.findOne({ idf: req.body.idf })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            if (user.role.role != 'Enseignant') { return res.status(401).json({ error: 'ce n est pas un enseignant !! ' }); }


            console.log('lid de lenseignant qui sera co-encadreur : ', user.role.numerp);


            Binome.findOne({ idf: req.body.idfB })
                .then(binome => {
                    if (!binome) {
                        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                    }

                    
                   // console.log('lid du binome est  : ', binome.role.numerp);

                       //console.log(binome);
                       console.log(binome.specialite);
                       console.log(binome.niveau);
                    sujet.titre = req.body.titre;
                    sujet.theme = req.body.theme;
                    sujet.description = req.body.description;
                    sujet.tauxAvancement = 0;
                    sujet.rapportURL = '';
                    sujet.typeSujet = 'externe';
                    sujet.pris = true;
                    sujet.Valide=false;
                    sujet.Binome = binome.idf;
                    sujet.Specialite = binome.specialite;
                    sujet.niveau = binome.niveau;
                    sujet.code = createCode(sujet);
                    console.log(sujet);
                    console.log('le pointeur : ' + user.role.numerp);
                    console.log('le etablissment : ' + req.body.etablissment);

                    const sujetE = new sujetexterne({
                        sujet: sujet,
                        copromoteur: user.role.numerp,
                        etablissment: req.body.etablissment

                    });
                    Binome.findOneAndUpdate(
                        { idf: binome.idf},
                        { $set: { 'aSujet': true} },
                        { new: true, upsert: true, setDefaultsOnInsert: true },
                        (err, docs) => {   
                            if (err) {
                                return res.status(500).send({ message: 'err de maj' + err });
                            }
                        }
                    )
                    console.log('le Sujet E : ' + sujetE);
                    sujetE.save()
                        .then(() => {
                            console.log('lid est : ', sujetE._id);
                            console.log('notre sujet est la  : ', sujetE);
                            return res.status(201).json({ message: 'Sujet cree et sujet interne proposé  !' });
                        })
                        .catch(error => { console.log(error); res.status(501).json({ error }) });


                })
                .catch(error =>console.log(error));



        })
        .catch(error => res.status(500).json({ error }));






}
//********************************************* La recherche dans sujet  ******************************************/
module.exports.SupprimerSujet =  async (req,res)=>{
    
    Sujet.deleteOne({'sujet.code': req.body.code} , function(err){
        console.log(err)
        if(!err){
            res.status(200).json({message:'oky'})
        }else{
            res.status(250).json({message:err})
        }
        
    })
    
}
//********** tout les sujet  ****/
module.exports.ToutSujet = (req, res) => {


    Sujet.find({}, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.status(200).json(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//*************** La recherche par Enseignant tout les sujet de l'enseignant connecté   **************************/

module.exports.GetSujetEnseignant = (req, res) => {

    const token = req.cookies.jwt;
    console.log('on chek ce token :', token);
    if (token) {
        jwt.verify(token, 'Token_secret_PFE', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                try {
                    console.log('lid decodé : ', decodedToken.userId);
                    Sujet.find({ 'encadreur': decodedToken.userId }).
                        then(sujet => {
                            return res.status(200).json(sujet);
                        }).catch();
                } catch (err) {
                    return res.status(500).json({ message: err });
                }
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        return res.status(404).json({ error: 'ta pas le droit frere' });
    }
}
//*************** La recherche par code   ******************************************/

module.exports.sujetParcode = (req, res) => {

    Sujet.findOne({ 'sujet.code': req.body.code }, (err, docs) => {
        if (!err && docs != null) {
            console.log('on a trouver ca : ', docs);
            console.log('on a trouver ca : ', docs.sujet.ficheEvaluations);
            res.send(docs.sujet.ficheEvaluations);
        }
        else console.log(' on a un souci : ' + err);
    });
};

module.exports.sujetParcode2 = (req, res) => {

    Sujet.findOne({ 'sujet.code': req.body.code }, (err, docs) => {
        if (!err && docs != null) {
            console.log('on a trouver ca : ', docs);
            console.log('on a trouver ca : ', docs.sujet.ficheValidations);
            res.send(docs.sujet.ficheValidations);
        }
        else console.log(' on a un souci : ' + err);
    });
};

//*************** La recherche par titre   ******************************************/

module.exports.sujetPartitre = (req, res) => {

    Sujet.find({ 'sujet.titre': req.body.titre }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//*************** La recherche par theme   ******************************************/

module.exports.sujetPartheme = (req, res) => {


    Sujet.find({ 'sujet.theme': req.body.theme }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//*************** La recherche par type   ******************************************/

module.exports.sujetPartype = (req, res) => {


    Sujet.find({ 'sujet.type': req.body.type }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//*************** La recherche par niveau   ******************************************/

module.exports.sujetParniveau = (req, res) => {


    Sujet.find({ 'sujet.niveau': req.body.niveau }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//*************** La recherche par specialite   ******************************************/

module.exports.sujetParspecialite = (req, res) => {

    Sujet.find({ 'sujet.Specialite': req.body.specialite }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//********************************************************************************************** */
module.exports.sujetParUnFiltre = async function sujetParUnFiltre(req, res) {

    var champs1 = "sujet." + req.body.filtre1 + "";
    var camp1 = req.body.champ1;


    console.log('on va comparé ca : ' + champs1 + ':' + camp1);

    if (req.body.filtre1 == "encadreur" || req.body.filtre1 == "copromoteur") {
        console.log('------------------------');
        console.log('------------------------');
        console.log('ENCADREUR');
        console.log('------------------------');
        console.log('------------------------');
        champs1 = req.body.filtre1;
        let user = await Utilisateur.findOne({ idf: camp1 }).then(us => {
            camp1 = us._id;
            console.log('lidf est devenu cet id : ' + camp1);
        });

    }
    const queryObj = {};
    queryObj[champs1] = camp1;
    console.log('query object  :', queryObj);

    Sujet.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.status(200).json(docs);
        }
        else res.status(500).json({ message: 'probleme de recherche' });
    });
};
//*********************************************************************************************/
module.exports.sujetParDeuxFiltre = async function sujetParDeuxFiltre(req, res) {

    var champs1 = "sujet." + req.body.filtre1 + "";
    var camp1 = req.body.champ1;
    var champs2 = "sujet." + req.body.filtre2 + ""
    var camp2 = req.body.champ2;

    console.log('on va comparé ca : ' + champs1 + ':' + camp1 + ' et ' + champs2 + ':' + camp2);

    if (req.body.filtre1 == "encadreur" || req.body.filtre1 == "copromoteur") {
        champs1 = req.body.filtre1;
        let user = await Utilisateur.findOne({ idf: camp1 }).then(us => {
            camp1 = us._id;
            console.log('lidf est devenu cet id : ' + camp1);
        });

    } else {
        if (req.body.filtre2 == "encadreur" || req.body.filtre2 == "copromoteur") {
            champs2 = req.body.filtre2;
            let user = await Utilisateur.findOne({ idf: camp2 }).then(us => {
                camp2 = us._id;
                console.log('lidf est devenu cet id : ' + camp2);
            });

        }
    }
    const queryObj = {};
    queryObj[champs1] = camp1;
    queryObj[champs2] = camp2;
    console.log('query object  :', queryObj);

    Sujet.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//*********************************************************************************************/
module.exports.sujetParTroisFiltre = async function sujetParTroisFiltre(req, res) {

    var champs1 = "sujet." + req.body.filtre1 + "";
    var camp1 = req.body.champ1;
    var champs2 = "sujet." + req.body.filtre2 + ""
    var camp2 = req.body.champ2;
    var champs3 = "sujet." + req.body.filtre3 + ""
    var camp3 = req.body.champ3;

    console.log('on va comparé ca : ' + champs1 + ':' + camp1 + ' et ' + champs2 + ':' + camp2);

    if (req.body.filtre1 == "encadreur" || req.body.filtre1 == "copromoteur") {
        champs1 = req.body.filtre1;
        let user = await Utilisateur.findOne({ idf: camp1 }).then(us => {
            camp1 = us._id;
            console.log('lidf est devenu cet id : ' + camp1);
        });

    } else {
        if (req.body.filtre2 == "encadreur" || req.body.filtre2 == "copromoteur") {
            champs2 = req.body.filtre2;
            let user = await Utilisateur.findOne({ idf: camp2 }).then(us => {
                camp2 = us._id;
                console.log('lidf est devenu cet id : ' + camp2);
            });

        } else {
            if (req.body.filtre3 == "encadreur" || req.body.filtre3 == "copromoteur") {
                champs3 = req.body.filtre3;
                let user = await Utilisateur.findOne({ idf: camp3 }).then(us => {
                    camp3 = us._id;
                    console.log('lidf est devenu cet id : ' + camp3);
                });

            }
        }
    }
    const queryObj = {};
    queryObj[champs1] = camp1;
    queryObj[champs2] = camp2;
    queryObj[champs3] = camp3;
    console.log('query object  :', queryObj);

    Sujet.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//**********************************************************************************************/
module.exports.sujetParQuatreFiltre = async function sujetParQuatreFiltre(req, res) {

    var champs1 = "sujet." + req.body.filtre1 + "";
    var camp1 = req.body.champ1;
    var champs2 = "sujet." + req.body.filtre2 + ""
    var camp2 = req.body.champ2;
    var champs3 = "sujet." + req.body.filtre3 + ""
    var camp3 = req.body.champ3;
    var champs4 = "sujet." + req.body.filtre4 + ""
    var camp4 = req.body.champ4;

    console.log('on va comparé ca : ' + champs1 + ':' + camp1 + ' et ' + champs2 + ':' + camp2);

    if (req.body.filtre1 == "encadreur" || req.body.filtre1 == "copromoteur") {
        champs1 = req.body.filtre1;
        let user = await Utilisateur.findOne({ idf: camp1 }).then(us => {
            camp1 = us._id;
            console.log('lidf est devenu cet id : ' + camp1);
        });

    } else {
        if (req.body.filtre2 == "encadreur" || req.body.filtre2 == "copromoteur") {
            champs2 = req.body.filtre2;
            let user = await Utilisateur.findOne({ idf: camp2 }).then(us => {
                camp2 = us._id;
                console.log('lidf est devenu cet id : ' + camp2);
            });

        } else {
            if (req.body.filtre3 == "encadreur" || req.body.filtre3 == "copromoteur") {
                champs3 = req.body.filtre3;
                let user = await Utilisateur.findOne({ idf: camp3 }).then(us => {
                    camp3 = us._id;
                    console.log('lidf est devenu cet id : ' + camp3);
                });

            } else {
                if (req.body.filtre4 == "encadreur" || req.body.filtre4 == "copromoteur") {
                    champs4 = req.body.filtre4;
                    let user = await Utilisateur.findOne({ idf: camp4 }).then(us => {
                        camp4 = us._id;
                        console.log('lidf est devenu cet id : ' + camp4);
                    });

                }
            }
        }
    }
    const queryObj = {};
    queryObj[champs1] = camp1;
    queryObj[champs2] = camp2;
    queryObj[champs3] = camp3;
    queryObj[champs4] = camp4;
    console.log('query object  :', queryObj);

    Sujet.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//*********************************************************************************************** */
module.exports.sujetParCinqueFiltre = async function sujetParCinqueFiltre(req, res) {

    var champs1 = "sujet." + req.body.filtre1 + "";
    var camp1 = req.body.champ1;
    var champs2 = "sujet." + req.body.filtre2 + ""
    var camp2 = req.body.champ2;
    var champs3 = "sujet." + req.body.filtre3 + ""
    var camp3 = req.body.champ3;
    var champs4 = "sujet." + req.body.filtre4 + ""
    var camp4 = req.body.champ4;
    var champs5 = "sujet." + req.body.filtre5 + ""
    var camp5 = req.body.champ5;

    console.log('on va comparé ca : ' + champs1 + ':' + camp1 + ' et ' + champs2 + ':' + camp2);

    if (req.body.filtre1 == "encadreur" || req.body.filtre1 == "copromoteur") {
        champs1 = req.body.filtre1;
        let user = await Utilisateur.findOne({ idf: camp1 }).then(us => {
            camp1 = us._id;
            console.log('lidf est devenu cet id : ' + camp1);
        });
    } else {
        if (req.body.filtre2 == "encadreur" || req.body.filtre2 == "copromoteur") {
            champs2 = req.body.filtre2;
            let user = await Utilisateur.findOne({ idf: camp2 }).then(us => {
                camp2 = us._id;
                console.log('lidf est devenu cet id : ' + camp2);
            });
        } else {
            if (req.body.filtre3 == "encadreur" || req.body.filtre3 == "copromoteur") {
                champs3 = req.body.filtre3;
                let user = await Utilisateur.findOne({ idf: camp3 }).then(us => {
                    camp3 = us._id;
                    console.log('lidf est devenu cet id : ' + camp3);
                });
            } else {
                if (req.body.filtre4 == "encadreur" || req.body.filtre4 == "copromoteur") {
                    champs4 = req.body.filtre4;
                    let user = await Utilisateur.findOne({ idf: camp4 }).then(us => {
                        camp4 = us._id;
                        console.log('lidf est devenu cet id : ' + camp4);
                    });
                } else {
                    if (req.body.filtre5 == "encadreur" || req.body.filtre5 == "copromoteur") {
                        champs5 = req.body.filtre5;
                        let user = await Utilisateur.findOne({ idf: camp5 }).then(us => {
                            camp5 = us._id;
                            console.log('lidf est devenu cet id : ' + camp5);
                        });
                    }
                }
            }
        }
    }
    const queryObj = {};
    queryObj[champs1] = camp1;
    queryObj[champs2] = camp2;
    queryObj[champs3] = camp3;
    queryObj[champs4] = camp4;
    queryObj[champs5] = camp5;
    console.log('query object  :', queryObj);

    Sujet.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//**************************************************************************************************************/
module.exports.sujetParSixFiltre = async function sujetParSixFiltre(req, res) {

    var champs1 = "sujet." + req.body.filtre1 + "";
    var camp1 = req.body.champ1;
    var champs2 = "sujet." + req.body.filtre2 + ""
    var camp2 = req.body.champ2;
    var champs3 = "sujet." + req.body.filtre3 + ""
    var camp3 = req.body.champ3;
    var champs4 = "sujet." + req.body.filtre4 + ""
    var camp4 = req.body.champ4;
    var champs5 = "sujet." + req.body.filtre5 + ""
    var camp5 = req.body.champ5;
    var champs6 = "sujet." + req.body.filtre6 + ""
    var camp6 = req.body.champ6;

    console.log('on va comparé ca : ' + champs1 + ':' + camp1 + ' et ' + champs2 + ':' + camp2);

    if (req.body.filtre1 == "encadreur" || req.body.filtre1 == "copromoteur") {
        champs1 = req.body.filtre1;
        let user = await Utilisateur.findOne({ idf: camp1 }).then(us => {
            camp1 = us._id;
            console.log('lidf est devenu cet id : ' + camp1);
        });
    } else {
        if (req.body.filtre2 == "encadreur" || req.body.filtre2 == "copromoteur") {
            champs2 = req.body.filtre2;
            let user = await Utilisateur.findOne({ idf: camp2 }).then(us => {
                camp2 = us._id;
                console.log('lidf est devenu cet id : ' + camp2);
            });
        } else {
            if (req.body.filtre3 == "encadreur" || req.body.filtre3 == "copromoteur") {
                champs3 = req.body.filtre3;
                let user = await Utilisateur.findOne({ idf: camp3 }).then(us => {
                    camp3 = us._id;
                    console.log('lidf est devenu cet id : ' + camp3);
                });
            } else {
                if (req.body.filtre4 == "encadreur" || req.body.filtre4 == "copromoteur") {
                    champs4 = req.body.filtre4;
                    let user = await Utilisateur.findOne({ idf: camp4 }).then(us => {
                        camp4 = us._id;
                        console.log('lidf est devenu cet id : ' + camp4);
                    });
                } else {
                    if (req.body.filtre5 == "encadreur" || req.body.filtre5 == "copromoteur") {
                        champs5 = req.body.filtre5;
                        let user = await Utilisateur.findOne({ idf: camp5 }).then(us => {
                            camp5 = us._id;
                            console.log('lidf est devenu cet id : ' + camp5);
                        });
                    } else {
                        if (req.body.filtre6 == "encadreur" || req.body.filtre6 == "copromoteur") {
                            champs6 = req.body.filtre6;
                            let user = await Utilisateur.findOne({ idf: camp6 }).then(us => {
                                camp6 = us._id;
                                console.log('lidf est devenu cet id : ' + camp6);
                            });
                        }
                    }
                }
            }
        }
    }
    const queryObj = {};
    queryObj[champs1] = camp1;
    queryObj[champs2] = camp2;
    queryObj[champs3] = camp3;
    queryObj[champs4] = camp4;
    queryObj[champs5] = camp5;
    queryObj[champs6] = camp6;

    console.log('query object  :', queryObj);

    Sujet.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//**************************************************************************************************************/
module.exports.sujetParSeptFiltre = async function sujetParSixFiltre(req, res) {

    var champs1 = "sujet." + req.body.filtre1 + "";
    var camp1 = req.body.champ1;
    var champs2 = "sujet." + req.body.filtre2 + ""
    var camp2 = req.body.champ2;
    var champs3 = "sujet." + req.body.filtre3 + ""
    var camp3 = req.body.champ3;
    var champs4 = "sujet." + req.body.filtre4 + ""
    var camp4 = req.body.champ4;
    var champs5 = "sujet." + req.body.filtre5 + ""
    var camp5 = req.body.champ5;
    var champs6 = "sujet." + req.body.filtre6 + ""
    var camp6 = req.body.champ6;
    var champs7 = "sujet." + req.body.filtre7 + ""
    var camp7 = req.body.champ7;

    console.log('on va comparé ca : ' + champs1 + ':' + camp1 + ' et ' + champs2 + ':' + camp2);

    if (req.body.filtre1 == "encadreur" || req.body.filtre1 == "copromoteur") {
        champs1 = req.body.filtre1;
        let user = await Utilisateur.findOne({ idf: camp1 }).then(us => {
            camp1 = us._id;
            console.log('lidf est devenu cet id : ' + camp1);
        });
    } else {
        if (req.body.filtre2 == "encadreur" || req.body.filtre2 == "copromoteur") {
            champs2 = req.body.filtre2;
            let user = await Utilisateur.findOne({ idf: camp2 }).then(us => {
                camp2 = us._id;
                console.log('lidf est devenu cet id : ' + camp2);
            });
        } else {
            if (req.body.filtre3 == "encadreur" || req.body.filtre3 == "copromoteur") {
                champs3 = req.body.filtre3;
                let user = await Utilisateur.findOne({ idf: camp3 }).then(us => {
                    camp3 = us._id;
                    console.log('lidf est devenu cet id : ' + camp3);
                });
            } else {
                if (req.body.filtre4 == "encadreur" || req.body.filtre4 == "copromoteur") {
                    champs4 = req.body.filtre4;
                    let user = await Utilisateur.findOne({ idf: camp4 }).then(us => {
                        camp4 = us._id;
                        console.log('lidf est devenu cet id : ' + camp4);
                    });
                } else {
                    if (req.body.filtre5 == "encadreur" || req.body.filtre5 == "copromoteur") {
                        champs5 = req.body.filtre5;
                        let user = await Utilisateur.findOne({ idf: camp5 }).then(us => {
                            camp5 = us._id;
                            console.log('lidf est devenu cet id : ' + camp5);
                        });
                    } else {
                        if (req.body.filtre6 == "encadreur" || req.body.filtre6 == "copromoteur") {
                            champs6 = req.body.filtre6;
                            let user = await Utilisateur.findOne({ idf: camp6 }).then(us => {
                                camp6 = us._id;
                                console.log('lidf est devenu cet id : ' + camp6);
                            });
                        }else {
                            if (req.body.filtre7 == "encadreur" || req.body.filtre7 == "copromoteur") {
                                champs7 = req.body.filtre7;
                                let user = await Utilisateur.findOne({ idf: camp7 }).then(us => {
                                    camp7 = us._id;
                                    console.log('lidf est devenu cet id : ' + camp7);
                                });
                            }
                        }
                    }
                }
            }
        }
    }
    const queryObj = {};
    queryObj[champs1] = camp1;
    queryObj[champs2] = camp2;
    queryObj[champs3] = camp3;
    queryObj[champs4] = camp4;
    queryObj[champs5] = camp5;
    queryObj[champs6] = camp6;
    queryObj[champs7] = camp7;

    console.log('query object  :', queryObj);

    Sujet.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//******************* la modification du titre d'un sujet  *******************************************/

module.exports.modifierTitreE = (req, res) => {


    const token = req.cookies.jwt;
    console.log('on chek ce token :', token);
    if (token) {
        jwt.verify(token, 'Token_secret_PFE', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                try {
                    console.log('lid decodé : ', decodedToken.userId);
                    Sujet.findOneAndUpdate(
                        { encadreur: decodedToken.userId, 'sujet.code': req.body.code },
                        { $set: { 'sujet.titre': req.body.titre } },
                        { new: true, upsert: true, setDefaultsOnInsert: true },
                        (err, docs) => {
                            if (!err) {
                                console.log('sujet mis a jour ');
                                return res.status(200).json(docs);
                            }
                            else return res.status(500).send({ message: 'err de maj' + err });
                        }
                    )
                } catch (err) {
                    return res.status(500).json({ message: err });
                }
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        return res.status(404).json({ error: 'ta pas le droit frere' });
    }
}
//******************* la modification  de la description d'un sujet  *******************************************/

module.exports.modifierDescriptionE = (req, res) => {


    const token = req.cookies.jwt;
    console.log('on chek ce token :', token);
    if (token) {
        jwt.verify(token, 'Token_secret_PFE', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                try {
                    console.log('lid decodé : ', decodedToken.userId);
                    Sujet.findOneAndUpdate(
                        { encadreur: decodedToken.userId, 'sujet.code': req.body.code },
                        { $set: { 'sujet.description': req.body.description } },
                        { new: true, upsert: true, setDefaultsOnInsert: true },
                        (err, docs) => {
                            if (!err) {
                                console.log('sujet mis a jour ');
                                return res.status(200).json(docs);
                            }
                            else return res.status(500).send({ message: 'err de maj' + err });
                        }
                    )
                } catch (err) {
                    return res.status(500).json({ message: err });
                }
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        return res.status(404).json({ error: 'ta pas le droit frere' });
    }
}
//******************* la modification  du taux d'avancement d d'un sujet  *******************************************/

module.exports.modifiertauxAvancementE = (req, res) => {
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, 'Token_secret_PFE', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                try {
                    console.log('lid decodé : ', decodedToken.userId);
                    console.log('.......')
                    console.log( req.body.code)
                    console.log('.......')
                    console.log( req.body.tauxAvancement)
                    console.log('.......')
                    Sujet.findOneAndUpdate(
                        { encadreur: decodedToken.userId, 'sujet.code': req.body.code },
                        { $set: { 'sujet.tauxAvancement': req.body.tauxAvancement } },
                        { new: true, upsert: false, setDefaultsOnInsert: true },
                        (err, docs) => {
                            console.log('la docs :',docs)
                            if (!err && docs !=null) {
                                console.log('sujet mis a jour ');
                                return res.status(200).json(docs);
                            }
                            else {
                                if(docs==null){return res.status(250).json(docs);}
                                return res.status(500).json({ message: 'err de maj' + err });
                            }
                        }
                    ).catch('erreur yew')
                } catch (err) {
                    return res.status(500).json({ message: err });
                }
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        return res.status(404).json({ error: 'ta pas le droit frere' });
    }
}

//******************* la modification  et l'affectation d'un binome a un sujet d'un sujet  *******************************************/

module.exports.AffecterBinome = (req, res) => {

    Binome.findOne({ idf: req.body.Binome }).then(bi => {
        if(bi.aSujet){
            return res.status(250).json(null);
        }else{
        console.log('le binome : ', req.body.Binome);
        Sujet.findOneAndUpdate(
            { 'sujet.code': req.body.code },
            { $set: { 'sujet.Binome': req.body.Binome, 'sujet.Specialite': bi.specialite, 'sujet.pris': true } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                Binome.findOneAndUpdate(
                    { idf: req.body.Binome},
                    { $set: { 'aSujet': true} },
                    { new: true, upsert: true, setDefaultsOnInsert: true },
                    (err, docs) => {   
                        if (!err) {
                            Notification.NewNotif(docs.encadreur,req.body.Binome,'Binome : '+req.body.Binome+' Vous avez ete affecter au sujet  : '+req.body.code+' !');
                            console.log('sujet mis a jour on lui a mis le binome idf : ', req.body.Binome, 'dont lidf est  : ', req.body.Binome);
                            return res.status(200).json(docs);
                        }
                        else return res.status(500).send({ message: 'err de maj' + err });
                    }
                )
               
            }
        )
    }
    }).catch();

}

//************** Valider sujet  *********************************************/
module.exports.ValiderSujet = (req, res) => {
    Sujet.findOneAndUpdate(
        { 'sujet.code': req.body.code },
        { $set: { 'sujet.Valide': true } },
        { new: true, upsert: false, setDefaultsOnInsert: true },
        (err, docs) => {
            if (!err) {
                console.log('-------------------------------');
                console.log('-------------------------------');
                console.log('-------------------------------');
                console.log(' sujet mis a jour on la validé ');
                console.log('-------------------------------');
                console.log('-------------------------------');
                console.log('-------------------------------');
                return res.status(200).send({ message: 'Sujet : ' + req.body.code + ' Valider Avec Succes ' });
            }
            else {
                console.log('-------------------------------');
                console.log('-------------------------------');
                console.log('-------------------------------');
                console.log(' ERREUR');
                console.log('-------------------------------');
                console.log('-------------------------------');
                console.log('-------------------------------');
                return res.status(500).send({ message: 'err de maj' + err });
            }
        }
    )
}