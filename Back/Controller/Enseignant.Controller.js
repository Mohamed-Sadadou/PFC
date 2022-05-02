const sujet = require('../Models/Sujet.Schema');
const sujetinterne = require('../Models/SujetInterne.Model');
const Utilisateur = require('../Models/Utilisateur.Model');
const sujetexterne = require('../Models/SujetInterne.Model');
const Sujet = require('../Models/SujetInterne.Model');
const Enseignant = require('../Models/Enseignant.Model');
const ficheEvaluation = require('../Models/FicheEvaluation.Schema');
const ficheValidation = require('../Models/FicheValidation.Schema');
const UserModel = require('../Models/Utilisateur.Model');
const Binome = require('../Models/Binome.Model');
const etu1 = require('../Models/Etudiant.Model');
const etu2 = require('../Models/Etudiant.Model');
const RoleU = require('../Models/RoleUser.Schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Notification = require('../Controller/Notification.Controller');
var final;
//************************* Note Finale */
module.exports.NoteFinal = (req, res) => {
    var Liste;
    var notes = 0;
    Sujet.findOne({ 'sujet.code': req.body.codeSujet }, (err, docs) => {
        if (!err && docs != null) {
            Liste = docs.sujet.ficheEvaluations;
            Liste.forEach(element => {
                notes = notes + element.note;
            })
            notes = notes / Liste.length;
            console.log(notes);
            Sujet.findOneAndUpdate(
                { 'sujet.code': req.body.codeSujet },
                { $set: { 'sujet.note': notes } },
                { new: true, upsert: false, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) {
                        console.log('sujet mis a jour ');
                        return res.status(200).json({ note: notes });
                    }
                    else return res.status(500).send({ message: 'err de maj' + err });
                }
            )


        }
        else console.log(' on a un souci : ' + err);
    });
}
//******************** Remplis fiche d'evaluation (role : jury) ***********/

module.exports.RempliFicheEvaluation = (req, res) => {
    console.log('le req : ', req.body);
    var last;
    console.log('lid decodé : ', req.cookies.IDF);
    console.log('Le role du jury  : ', req.body.final);
    if (req.body.final == 'President') final = true;
    else final = false;
    ficheEvaluation.jury = req.cookies.IDF;
    ficheEvaluation.note = req.body.note;
    ficheEvaluation.remarque = req.body.remarque;
    ficheEvaluation.date = Date.now();
    ficheEvaluation.final = final;

    Sujet.findOne({ 'sujet.code': req.body.codeSujet }, (err, docs) => {
        if (!err && docs != null) {
            if (docs.sujet.Valide) {
                last = docs.sujet.ficheEvaluations[docs.sujet.ficheEvaluations.length - 1]
                if (last) {
                    if (docs.sujet.ficheEvaluations[docs.sujet.ficheEvaluations.length - 1].final) {
                        res.status(250).json(null)
                    } else {
                        console.log('la fiche devaluation : ', ficheEvaluation);

                        Sujet.findOneAndUpdate(
                            { 'sujet.code': req.body.codeSujet },
                            { $addToSet: { 'sujet.ficheEvaluations': ficheEvaluation } },
                            { new: true, upsert: false, setDefaultsOnInsert: true },
                            (err, docs) => {
                                if (!err) {
                                    if (docs != null) {
                                        Notification.NewNotif(req.cookies.IDF, docs.encadreur, 'Sujet : ' + docs.sujet.code + ' a recu une nouvelle fiche d evaluation ! la note est : ' + ficheEvaluation.note + '');
                                        console.log('fiche evaluation correctement ajouter au sujet : ', req.body.codeSujet);
                                        return res.status(200).json({ message: 'fiche sauvegarder Bsahtek frere !' });
                                    } else {
                                        console.log('fiche evaluation non ajouter au sujet : ', req.body.codeSujet);
                                        return res.status(400).json({ message: ' Aucune donnée correspondante fiche non ajouter  !' });
                                    }

                                }
                                else return res.status(500).send({ message: 'err d ajout ' + err });
                            }
                        )
                    }
                } else {
                    console.log('la fiche devaluation : ', ficheEvaluation);

                    Sujet.findOneAndUpdate(
                        { 'sujet.code': req.body.codeSujet },
                        { $addToSet: { 'sujet.ficheEvaluations': ficheEvaluation } },
                        { new: true, upsert: false, setDefaultsOnInsert: true },
                        (err, docs) => {
                            if (!err) {
                                if (docs != null) {
                                    Notification.NewNotif(req.cookies.IDF, docs.encadreur, 'Sujet : ' + docs.sujet.code + ' a recu une nouvelle fiche d evaluation ! la note est : ' + req.body.note + '');
                                    console.log('fiche evaluation correctement ajouter au sujet : ', req.body.codeSujet);
                                    return res.status(200).json({ message: 'fiche sauvegarder Bsahtek frere !' });
                                } else {
                                    console.log('fiche evaluation non ajouter au sujet : ', req.body.codeSujet);
                                    return res.status(400).json({ message: ' Aucune donnée correspondante fiche non ajouter  !' });
                                }

                            }
                            else return res.status(500).send({ message: 'err d ajout ' + err });
                        }
                    )
                }

            } else {
                return res.status(210).send({ message: 'err d ajout ' + err });
            }
        }
        else console.log(' on a un souci : ' + err);
    });


}
//******************** Remplis Consulter fiche evaluation (role : jury) ***********/

module.exports.ConsulteFicheEvaluation = (req, res) => {
    var Fiches = [];
    Sujet.find({ 'sujet.code': req.body.codeSujet }, (err, docs) => {
        if (!err && docs != null) {
            console.log('la docs ', docs)
            // console.log('on a trouver ca : ', docs.sujet.ficheEvaluations);
            docs.forEach(sujet => {
                sujet.sujet.ficheEvaluations.forEach(element => {
                    console.log('on a trouver ca : ', element);
                    Fiches.push(element);
                });
            });

            res.send(Fiches);
        }
        else console.log(' on a un souci : ' + err);
    });



};


//*********************************************************************************** */
module.exports.RempliFicheValidation = (req, res) => {
    //console.log('le req : ',req.body);

    console.log('lid decodé : ', req.cookies.IDF);
    console.log('Le role du jury  : ', req.body.final);
    if (req.body.final == 'Favorable') final = true;
    else final = false;

    ficheValidation.membre = req.cookies.IDF;
    ficheValidation.reserves = req.body.reserves;
    ficheValidation.date = Date.now();
    ficheValidation.etat = final;

    console.log('la fiche devaluation : ', ficheValidation);

    Sujet.findOneAndUpdate(
        { 'sujet.code': req.body.codeSujet },
        { $addToSet: { 'sujet.ficheValidations': ficheValidation } },
        { new: true, upsert: false, setDefaultsOnInsert: true },
        (err, docs) => {
            if (!err) {
                if (docs != null) {
                    consolelog('la fiche de validation ', ficheValidation.reserves);
                    Notification.NewNotif(req.cookies.IDF, docs.encadreur, 'Sujet : ' + docs.sujet.code + ' a recu une nouvelle fiche de validation  ! l avis est : ' + ficheValidation.etat + ' les reserves : ', ficheValidation.reserves);
                    console.log('fiche evaluation correctement ajouter au sujet : ', req.body.codeSujet);
                    return res.status(200).json({ message: 'fiche sauvegarder Bsahtek frere !' });
                } else {
                    console.log('fiche evaluation non ajouter au sujet : ', req.body.codeSujet);
                    return res.status(400).json({ message: ' Aucune donnée correspondante fiche non ajouter  !' });
                }

            }
            else return res.status(500).send({ message: 'err d ajout ' + err });
        }
    )

}
/**************************************************************************************************************/

module.exports.GetEns = async function GetEns(req, res) {
    const queryObj = {};
    queryObj["role.role"] = "Enseignant";
    await UserModel.aggregate([
        { $match: queryObj }, {
            $lookup: {
                from: "enseignantschemas",
                localField: "role.numerp",
                foreignField: "_id",
                as: "enseignant"
            }
        }
    ]).then(users => {

        res.status(200).json(users);
    }).catch();
};

module.exports.GetEns1 = async function GetEns1F(req, res) {
    const queryObj = {};
    queryObj["role.role"] = "Enseignant";
    queryObj[req.body.filtre1] = req.body.champ1;
    await UserModel.aggregate([
        { $match: queryObj }, {
            $lookup: {

                from: "enseignantschemas",
                localField: "role.numerp",
                foreignField: "_id",
                as: "enseignant",

            }
        }
    ]).then(users => {

        console.log(users[0]);
        if (!users) { console.log('status 201'); res.status(201).json(null) }
        else res.status(200).json(users);
    }).catch();
};

module.exports.GetEns1F = async function GetEns1F(req, res) {
    const queryObj = {};
    queryObj["role.role"] = "Enseignant";
    await UserModel.aggregate([
        { $match: queryObj }, {
            $lookup: {

                from: "enseignantschemas",
                let: { id: "$role.numerp", },
                as: "enseignant",
                pipeline: [{
                    $match: { $expr: { $and: [{ $eq: ["$$id", "$_id"] }, { $eq: ["$" + req.body.filtre1 + "", req.body.champ1] }] } }
                }]
            }
        }
    ]).then(users => {

        console.log(users[0]);
        if (!users) { console.log('status 201'); res.status(201).json(null) }
        else res.status(200).json(users);
    }).catch();
};

module.exports.GetEns2F = async function GetEns2F(req, res) {
    const queryObj = {};
    queryObj["role.role"] = "Enseignant";
    await UserModel.aggregate([
        { $match: queryObj }, {
            $lookup: {

                from: "enseignantschemas",
                let: { id: "$role.numerp", },
                as: "enseignant",
                pipeline: [{
                    $match: { $expr: { $and: [{ $eq: ["$$id", "$_id"] }, { $eq: ["$" + req.body.filtre1 + "", req.body.champ1] }, { $eq: ["$" + req.body.filtre2 + "", req.body.champ2] }] } }
                }]
            }
        }
    ]).then(users => {

        console.log(users[0]);
        if (!users) { console.log('status 201'); res.status(201).json(null) }
        else res.status(200).json(users);
    }).catch();
};

module.exports.GetEns3F = async function GetEns3F(req, res) {
    const queryObj = {};
    queryObj["role.role"] = "Enseignant";
    await UserModel.aggregate([
        { $match: queryObj }, {
            $lookup: {

                from: "enseignantschemas",
                let: { id: "$role.numerp", },
                as: "enseignant",
                pipeline: [{
                    $match: { $expr: { $and: [{ $eq: ["$$id", "$_id"] }, { $eq: ["$" + req.body.filtre1 + "", req.body.champ1] }, { $eq: ["$" + req.body.filtre2 + "", req.body.champ2] }, { $eq: ["$" + req.body.filtre3 + "", req.body.champ3] }] } }
                }]
            }
        }
    ]).then(users => {

        res.status(200).json(users);
    }).catch();
};

module.exports.GetEns4F = async function GetEns4F(req, res) {
    const queryObj = {};
    queryObj["role.role"] = "Enseignant";
    await UserModel.aggregate([
        { $match: queryObj }, {
            $lookup: {

                from: "enseignantschemas",
                let: { id: "$role.numerp", },
                as: "enseignant",
                pipeline: [{
                    $match: { $expr: { $and: [{ $eq: ["$$id", "$_id"] }, { $eq: ["$" + req.body.filtre1 + "", req.body.champ1] }, { $eq: ["$" + req.body.filtre2 + "", req.body.champ2] }, { $eq: ["$" + req.body.filtre3 + "", req.body.champ3] }, { $eq: ["$" + req.body.filtre4 + "", req.body.champ4] }] } }
                }]
            }
        }
    ]).then(users => {

        res.status(200).json(users);
    }).catch();
};


//**************************************************************************************************************/

//********************************************************************************** */
module.exports.GetEnseignant = async function GetEnseignant(req, res) {

    Enseignants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Enseignant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Enseignant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;
        console.log('la querry object : ', queryObj);
        console.log('nos users avec Enseignant : ', Userss[i].idf);
        await Enseignant.findOne(queryObj).then(ensu => {
            console.log('le resulta du fiind one : ', ensu);
            if (ensu != null) {
                let Ens = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "grade": ensu.grade,
                    "specialite": ensu.specialite,
                    "numero": ensu.numero,
                    "email": ensu.email,
                    "etablissement": ensu.etablissement,
                    "roles": ensu.roles

                }
                Enseignants.push(Ens);
            }
        }).catch((err) => { res.status(200).json('pas d Enseignant '); });

    };
    console.log('nos etudiant donc : ', Enseignants);
    res.status(200).json(Enseignants);
};

module.exports.EnseignantParUnFiltre = async function EnseignantParUnFiltre(req, res) {

    Enseignants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Enseignant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Enseignant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;
        queryObj[req.body.filtre1] = req.body.champ1;
        console.log('la querry object : ', queryObj);
        console.log('nos users avec Enseignant : ', Userss[i].idf);
        await Enseignant.findOne(queryObj).then(ensu => {
            console.log('le resulta du fiind one : ', ensu);
            if (ensu != null) {
                let Ens = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "grade": ensu.grade,
                    "specialite": ensu.specialite,
                    "numero": ensu.numero,
                    "email": ensu.email,
                    "etablissement": ensu.etablissement,
                    "roles": ensu.roles

                }
                Enseignants.push(Ens);
            }
        }).catch((err) => { res.status(200).json('pas d Enseignant '); });

    };
    console.log('nos etudiant donc : ', Enseignants);
    res.status(200).json(Enseignants);
};

module.exports.EnseignantParDeuxFiltre = async function EnseignantParDeuxFiltre(req, res) {
    Enseignants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Enseignant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Enseignant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;
        queryObj[req.body.filtre1] = req.body.champ1;
        queryObj[req.body.filtre2] = req.body.champ2;
        console.log('la querry object : ', queryObj);
        console.log('nos users avec Enseignant : ', Userss[i].idf);
        await Enseignant.findOne(queryObj).then(ensu => {
            console.log('le resulta du fiind one : ', ensu);
            if (ensu != null) {
                let Ens = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "grade": ensu.grade,
                    "specialite": ensu.specialite,
                    "numero": ensu.numero,
                    "email": ensu.email,
                    "etablissement": ensu.etablissement,
                    "roles": ensu.roles

                }
                Enseignants.push(Ens);
            }
        }).catch((err) => { res.status(200).json('pas d Enseignant '); });

    };
    console.log('nos etudiant donc : ', Enseignants);
    res.status(200).json(Enseignants);
};

module.exports.EtudiantParTroisFiltre = async function GetEtudiant(req, res) {

    Enseignants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Enseignant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Enseignant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;
        queryObj[req.body.filtre1] = req.body.champ1;
        queryObj[req.body.filtre2] = req.body.champ2;
        queryObj[req.body.filtre3] = req.body.champ3;
        console.log('la querry object : ', queryObj);
        console.log('nos users avec Enseignant : ', Userss[i].idf);
        await Enseignant.findOne(queryObj).then(ensu => {
            console.log('le resulta du fiind one : ', ensu);
            if (ensu != null) {
                let Ens = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "grade": ensu.grade,
                    "specialite": ensu.specialite,
                    "numero": ensu.numero,
                    "email": ensu.email,
                    "etablissement": ensu.etablissement,
                    "roles": ensu.roles

                }
                Enseignants.push(Ens);
            }
        }).catch((err) => { res.status(200).json('pas d Enseignant '); });

    };
    console.log('nos etudiant donc : ', Enseignants);
    res.status(200).json(Enseignants);

};

module.exports.EtudiantParQuatreFiltre = async function GetEtudiant(req, res) {
    Enseignants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Enseignant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Enseignant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;
        queryObj[req.body.filtre1] = req.body.champ1;
        queryObj[req.body.filtre2] = req.body.champ2;
        queryObj[req.body.filtre3] = req.body.champ3;
        queryObj[req.body.filtre4] = req.body.champ4;
        console.log('la querry object : ', queryObj);
        console.log('nos users avec Enseignant : ', Userss[i].idf);
        await Enseignant.findOne(queryObj).then(ensu => {
            console.log('le resulta du fiind one : ', ensu);
            if (ensu != null) {
                let Ens = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "grade": ensu.grade,
                    "specialite": ensu.specialite,
                    "numero": ensu.numero,
                    "email": ensu.email,
                    "etablissement": ensu.etablissement,
                    "roles": ensu.roles

                }
                Enseignants.push(Ens);
            }
        }).catch((err) => { res.status(200).json('pas d Enseignant '); });

    };
    console.log('nos etudiant donc : ', Enseignants);
    res.status(200).json(Enseignants);

};