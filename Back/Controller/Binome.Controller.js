const sujet = require('../Models/Sujet.Schema');
const sujetinterne = require('../Models/SujetInterne.Model');
const Utilisateur = require('../Models/Utilisateur.Model');
const sujetexterne = require('../Models/SujetInterne.Model');
const Sujet = require('../Models/SujetInterne.Model');
const ficheEvaluation = require('../Models/FicheEvaluation.Schema');
const ficheValidation = require('../Models/FicheValidation.Schema');
const Notification = require('../Controller/Notification.Controller');
const UserModel = require('../Models/Utilisateur.Model');
const Binome = require('../Models/Binome.Model');
const etu1 = require('../Models/Etudiant.Model');
const etu2 = require('../Models/Etudiant.Model');
const RoleU = require('../Models/RoleUser.Schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//************* code sujet  ****************************************************************/



function createCode(idf1, idf2) {


    return [idf1.substring(0, 2), idf2.substring(2, 4), Math.floor(Math.random() * 100000000)].join('');
}

//*************** Cree Un Sujetinterne ( enseignant propose sujet ) *****************/

module.exports.CreeCompteBinome = async (req, res) => {

    console.log('on affiche le req  ', req.body);

    var etu1, etu2, nom1, nom2;

    //****************** recuperation du premier ID *******************/

    UserModel.findOne({ idf: req.body.idf1 })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            etu1 = user._id;
            nom1 = user.nomUtilisateur;
            console.log('Etudiant 1 : ', etu1, '   nom : ', nom1);

            //***************************** recuperation du deuxieme ID *******************************/

            UserModel.findOne({ idf: req.body.idf2 })
                .then(user => {
                    if (!user) {
                        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                    }
                    etu2 = user._id;
                    nom2 = user.nomUtilisateur;
                    console.log('Etudiant 1 : ', etu2, '   nom : ', nom2);

                    const bin = new Binome({
                        idf: createCode(req.body.idf1, req.body.idf2),
                        Etudiant1: etu1,
                        Etudiant2: etu2,
                        specialite: req.body.specialite,
                        niveau: req.body.niveau,
                        aSujet: false,
                        valide: false
                    });
                    bin.save()
                        .then(() => {
                            console.log('lid est : ', bin._id);
                            RoleU.role = 'Binome';
                            RoleU.numerp = bin._id;
                            const idf = bin.idf;
                            const mdp = req.body.mdp;
                            const nomUtilisateur = ("Binome." + nom1 + "." + nom2).replace(/ /g,"");
                           

                            console.log('idf : ', idf, ' nomUtilisateur : ', nomUtilisateur, ' mdp : ', mdp);

                            bcrypt.hash(mdp, 10)
                                .then(hash => { 
                                    console.log('le mdp: ', hash);
                                    const user = new UserModel({
                                        idf: idf, mdp: hash, nomUtilisateur: nomUtilisateur, role: RoleU
                                    });
                                    user.save()
                                        .then(() => { Notification.NewNotif(req.body.idf1,req.body.idf2,'Etudiant : '+req.body.idf1+' a cree un compte binome avec vous ! IDF du compte Binome est : '+idf+' le mot de passe est : '+req.body.mdp+'');
                                            res.status(201).json({ message: 'compte Binome et Utilisateur créé !' })
                                        })
                                        .catch(error => res.status(400).json({ message: 'probleme de sauvegarde de utilisateur ' + error }));
                                })
                                .catch(error => res.status(500).json({ error }));
                        })
                        .catch(error => res.status(500).json({ message: 'probleme de sauvegarde du binome ' + error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));




}

//********************************************* La recherche dans Binomes  ******************************************/

//********** tout les Binomes  ****/
module.exports.ToutBinome = (req, res) => {


    Binome.find({}, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};

//*************** La recherche par idf   ******************************************/

module.exports.BinomeParIdf = (req, res) => {


    Binome.find({ 'idf': req.body.idf }, (err, docs) => {
        if (!err && docs != null) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};

//*************** La recherche par specialite   ******************************************/

module.exports.BinomeParspecialite = (req, res) => {


    Binome.find({ 'specialite': req.body.specialite }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};

//*************** La recherche par validité *************************************/

module.exports.BinomeParvalidite = (req, res) => {


    Binome.find({ 'valide': req.body.valide }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};

//*************** La recherche ayant sujet ou non   ******************************************/

module.exports.BinomeParASujet = (req, res) => {


    Binome.find({ 'aSujet': req.body.aSujet }, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//********************************************************************************************/
//********************************************************************************************/
//****************************les fonction avec lookup ***************************************/

module.exports.GetBinome = async function GetBinome(req, res) {

    await Binome.aggregate([
        {
            $lookup: {
                from: "utilisateurschemas",
                localField: "Etudiant1",
                foreignField: "_id",
                as: "etudiant1"
            }
        }, {
            $lookup: {
                from: "utilisateurschemas",
                localField: "Etudiant2",
                foreignField: "_id",
                as: "etudiant2"
            }
        }
    ]).then(users => {
        console.log(users);
        res.status(200).json(users);
    }).catch();
};

module.exports.GetMesBinome = async function GetBinome(req, res) {

    const token = req.cookies.jwt;
    console.log('Get mes binomes on chek ce token :', token);
    if (token) {
        jwt.verify(token, 'Token_secret_PFE', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                try {
                    const queryObj = {};
                    const queryObj2 = {};
                    queryObj["etudiant1"] = decodedToken.userId;
                    queryObj2["etudiant2"] = decodedToken.userId;
                    console.log('--', queryObj, '--', queryObj2);

                    await Binome.aggregate([
                        {
                            $lookup: {
                                from: "utilisateurschemas",
                                localField: "Etudiant1",
                                foreignField: "_id",
                                as: "etudiant1"
                            }
                        }, {
                            $lookup: {
                                from: "utilisateurschemas",
                                localField: "Etudiant2",
                                foreignField: "_id",
                                as: "etudiant2"
                            }
                        }

                    ]).then(users => {
                                console.log('---------------------');
                                console.log('---------------------');
                                console.log('---------------------');
                                console.log('les users trouvé : ',users);
                                console.log('---------------------');
                                console.log('---------------------');
                                console.log('---------------------');
                                console.log('----------on retourne 200-----------');
                                res.status(200).json(users);

                    }).catch((err) => { console.log('erreur ', err) });
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

module.exports.GetBinome1F = async function GetBinome1F(req, res) {
    const queryObj = {};
    queryObj[req.body.filtre1] = req.body.champ1;
    await Binome.aggregate([{ $match: queryObj },
    {
        $lookup: {
            from: "utilisateurschemas",
            localField: "Etudiant1",
            foreignField: "_id",
            as: "etudiant1"
        }
    }, {
        $lookup: {
            from: "utilisateurschemas",
            localField: "Etudiant2",
            foreignField: "_id",
            as: "etudiant2"
        }
    }
    ]).then(users => {
        console.log(users);
        res.status(200).json(users);
    }).catch();
};

module.exports.GetBinome2F = async function GetBinome2F(req, res) {
    const queryObj = {};
    queryObj[req.body.filtre1] = req.body.champ1;
    queryObj[req.body.filtre2] = req.body.champ2;
    await Binome.aggregate([{ $match: queryObj },
    {
        $lookup: {
            from: "utilisateurschemas",
            localField: "Etudiant1",
            foreignField: "_id",
            as: "etudiant1"
        }
    }, {
        $lookup: {
            from: "utilisateurschemas",
            localField: "Etudiant2",
            foreignField: "_id",
            as: "etudiant2"
        }
    }
    ]).then(users => {
        console.log(users);
        res.status(200).json(users);
    }).catch();
};

module.exports.GetBinome3F = async function GetBinome3F(req, res) {
    const queryObj = {};
    queryObj[req.body.filtre1] = req.body.champ1;
    queryObj[req.body.filtre2] = req.body.champ2;
    queryObj[req.body.filtre3] = req.body.champ3;
    await Binome.aggregate([{ $match: queryObj },
    {
        $lookup: {
            from: "utilisateurschemas",
            localField: "Etudiant1",
            foreignField: "_id",
            as: "etudiant1"
        }
    }, {
        $lookup: {
            from: "utilisateurschemas",
            localField: "Etudiant2",
            foreignField: "_id",
            as: "etudiant2"
        }
    }
    ]).then(users => {
        console.log(users);
        res.status(200).json(users);
    }).catch();
};

module.exports.GetBinome4F = async function GetBinome4F(req, res) {
    const queryObj = {};
    queryObj[req.body.filtre1] = req.body.champ1;
    queryObj[req.body.filtre2] = req.body.champ2;
    queryObj[req.body.filtre3] = req.body.champ3;
    queryObj[req.body.filtre4] = req.body.champ4;
    await Binome.aggregate([{ $match: queryObj },
    {
        $lookup: {
            from: "utilisateurschemas",
            localField: "Etudiant1",
            foreignField: "_id",
            as: "etudiant1"
        }
    }, {
        $lookup: {
            from: "utilisateurschemas",
            localField: "Etudiant2",
            foreignField: "_id",
            as: "etudiant2"
        }
    }
    ]).then(users => {
        console.log(users);
        res.status(200).json(users);
    }).catch();
};
//********************************************************************************************/
//********************************************************************************************/
//****************************les fonction avec boucle ***************************************/
module.exports.BinomeParUnFiltre = async function BinomeParUnFiltre(req, res) {

    console.log('on va comparé ca : ' + req.body.filtre1 + ':' + req.body.champ1);

    Binomess = [];
    const queryObj = {};
    queryObj[req.body.filtre1] = req.body.champ1;
    console.log('query object  :', queryObj);

    await Binome.find(queryObj)
        .then(Binomes => {
            Binomess = Binomes;
        })
        .catch((err) => { res.status(200).json('pas d Etudiant '); })

    for (i = 0; i < Binomess.length; i++) {

    }
    Userss = [];
    await UserModel.find({ 'role.role': 'Etudiant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Etudiant '); });
};
//********************************************************************************************/
module.exports.BinomeParDeuxFiltre = (req, res) => {

    const queryObj = {};
    queryObj[req.body.filtre1] = req.body.champ1;
    queryObj[req.body.filtre2] = req.body.champ2;
    console.log('query object  :', queryObj);

    Binome.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//********************************************************************************************/
module.exports.BinomeParTroisFiltre = (req, res) => {

    const queryObj = {};
    queryObj[req.body.filtre1] = req.body.champ1;
    queryObj[req.body.filtre2] = req.body.champ2;
    queryObj[req.body.filtre3] = req.body.champ3;
    console.log('query object  :', queryObj);

    Binome.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//********************************************************************************************/
//********************************************************************************************/
module.exports.BinomeParQuatreFiltre = (req, res) => {

    const queryObj = {};
    queryObj[req.body.filtre1] = req.body.champ1;
    queryObj[req.body.filtre2] = req.body.champ2;
    queryObj[req.body.filtre3] = req.body.champ3;
    queryObj[req.body.filtre4] = req.body.champ4;
    console.log('query object  :', queryObj);

    Binome.find(queryObj, (err, docs) => {
        if (!err) {
            console.log('on a trouver ca : ', docs);
            res.send(docs);
        }
        else console.log(' on a un souci : ' + err);
    });
};
//********************************************************************************************/
//********************************************************************************************/

//******************* mes binomes renvois les binomes de l'utilisateur creer  ***************/

module.exports.MesBinomes = (req, res) => {
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

                    Binome.find({ $or: [{ Etudiant1: decodedToken.userId }, { Etudiant2: decodedToken.userId }] }, (err, docs) => {
                        if (!err) {
                            console.log('on a trouver ca : ', docs);
                            res.send(docs);
                        }
                        else console.log(' on a un souci : ' + err);
                    });
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

//************ valider un compte binome  *********************************************/

module.exports.ValiderCompteBinome = (req, res) => {
    const token = req.cookies.jwt;
    console.log('-------------------------------');
    console.log('-------------------------------');
    console.log('les req    :   ', req.body.etudiant2, '-----', req.body.idfB)
    console.log('-------------------------------');
    console.log('-------------------------------');
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
                    let bii = Binome.findOneAndUpdate(
                        { $or: [{ Etudiant1: decodedToken.userId, valide: false, idf: req.body.idfB }, { Etudiant2: decodedToken.userId, valide: false, idf: req.body.idfB }] },
                        { $set: { valide: true } },
                        { new: true, upsert: false, setDefaultsOnInsert: true },
                        (err, docs) => {
                            if (!err) {
                                if (docs != null) {
                                    console.log('Binome Validé la docs ! ', docs.Etudiant1);
                                    UserModel.findOne({ _id: decodedToken.userId }).then(user1 => {
                                        etu1.findOneAndUpdate({ _id: user1.role.numerp }, { $set: { aBinome: true } }, { new: true, upsert: false, setDefaultsOnInsert: true }, (err, docs1) => {
                                            UserModel.findOne({ idf: req.body.etudiant2 }).then(user2 => {
                                                etu1.findOneAndUpdate({ _id: user2.role.numerp }, { $set: { aBinome: true } }, { new: true, upsert: false, setDefaultsOnInsert: true }, (err, docs2) => {
                                                    console.log('LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',user1,'  ',user2)
                                                    Notification.NewNotif(user1.idf,user2.idf,'Etudiant : '+user2.idf+' Viens de valider votre compte Binome !');
                                                    return res.status(200).json({ message: 'Compte Binome Validé Bsahtek frere !' });
                                                })
                                            })
                                        })
                                    })
                                } else {
                                    console.log('Binome non Validé ');
                                    return res.status(400).json({ message: ' Aucune donnée correspondante Compte Binome non Validé  !' });
                                }

                            }
                            else return res.status(500).send({ message: 'err de validation ' + err });
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
//**************************************************************************************** */5
module.exports.SupprimerBinomes = (req, res) => {
    console.log('////////////////////////////////')
    console.log('////////////////////////////////')
    console.log('////////////////////////////////')
    console.log('les tru a supprimer : ',req.body.autres)
    console.log('////////////////////////////////')
    console.log('////////////////////////////////')
    console.log('////////////////////////////////')
   Binome.deleteMany({idf:{$in:req.body.autres}},function(err){console.log(err)})
}

/****************** Postuler pour un sujet IDF fourni   **************** */

module.exports.PostulerSujet = (req, res) => {

    idfs = req.body.idfsujet;
    var postulant = false;
    const token = req.cookies.jwt;
    //console.log('on chek ce token :', token);
    console.log('--------- dans la methode postuler !!! ------')
    if (token) {
        console.log('--------- dans le IF !!! ------')
        jwt.verify(token, 'Token_secret_PFE', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                try {
                    console.log('--------- dans le try !!! ------')
                    Binome.find({ 'idf': req.body.idfB }, (err, docs) => {
                        if (!err && docs != null) {
                            console.log('-----------------')
                            console.log('-----------------')
                            console.log('-----------------')
                            console.log('--------'+docs[0].valide+'---------')
                            console.log('-----------------')
                            console.log('-----------------')
                            console.log('-----------------')
                            if(docs[0].valide){
                                sujetinterne.findOne({ 'sujet.code': req.body.idfsujet })
                                .then(sujets => {
                                    console.log('--------- dans le then sujet !!! ------')
                                    if (!sujet) { return res.status(401).json({ error: 'aucun sujet' }); }
                                    console.log(sujets.sujet.postulant);
                                    console.log(req.cookies.IDF);
                                    console.log( sujets.sujet.postulant.includes(req.cookies.IDF))
                                    if( sujets.sujet.postulant.includes(req.cookies.IDF)){
                                    console.log('tu es postulant');
                                    postulant = true;
                                    return res.status(260).json({ error: ' Tu es deja postulant ' });
                                    }
                                   
                                    if (!postulant) {
                                        sujetinterne.findOneAndUpdate(
                                            { 'sujet.code': req.body.idfsujet },
                                            { $addToSet: { 'sujet.postulant': req.cookies.IDF } },
                                            { new: true, upsert: false, setDefaultsOnInsert: true },
                                            (err, docs) => {
                                                if (!err) {
                                                    Notification.NewNotif(req.body.idfB,docs.encadreur,'Binome : '+req.body.idfB+' Viens de Postuler pour votre sujet : '+docs.sujet.code+' !');
                                                    console.log('pas derreur'); return res.status(200).json({ message: 'Vous avez été correctement ajouter a la liste des postulant pour le sujet identifier : ', idfs });

                                                } else {
                                                    console.log('erreur de mise a jour : ', err);
                                                    return res.status(500).send({ error: err });
                                                }
                                            }
                                        )
                                    }
                                }).catch(err);
                            }else{
                                console.log('NON VALIDE')
                                return res.status(250).json({ message: 'Votre Binome est pas encore validé' });
                            }
                            

                        }
                        else console.log(' on a un souci : ' + err);
                    }).catch('BINOME MAKACH');

                } catch (err) {
                    console.log('-- le try beug ---')
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

//******************* la modification du titre d'un sujet  *******************************************/

module.exports.modifierTitreB = (req, res) => {


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
                        { Binome: decodedToken.userId, 'sujet.code': req.body.code },
                        { $set: { 'sujet.titre': req.body.titre } },
                        { new: true, upsert: true, setDefaultsOnInsert: true },
                        (err, docs) => {
                            if (!err) {
                                console.log('sujet mis a jour ');
                                return res.send(docs);
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

module.exports.modifierDescriptionB = (req, res) => {


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
                        { Binome: decodedToken.userId, 'sujet.code': req.body.code },
                        { $set: { 'sujet.description': req.body.description } },
                        { new: true, upsert: true, setDefaultsOnInsert: true },
                        (err, docs) => {
                            if (!err && docs != null) {

                                console.log('sujet mis a jour ');
                                return res.send(docs);
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