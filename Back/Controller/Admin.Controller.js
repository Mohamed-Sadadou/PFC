const UserModel = require('../Models/Utilisateur.Model');
const EtudiantModel = require('../Models/Etudiant.Model');
const EnseingnantModel = require('../Models/Enseignant.Model');
const roleEnseignant = require('../Models/Role.Schema');
const Notification = require('../Controller/Notification.Controller');
const RoleU = require('../Models/RoleUser.Schema');
const { creeErr } = require('../utils/errors.utils');
const bcrypt = require('bcrypt');






//***************************** creer compte Etudiant ******************************/

module.exports.CreeCompteEtudiant = async (req, res) => {

    console.log('on affiche le req  ', req.body);
    const etu = new EtudiantModel({
        section: req.body.section,
        specialite: req.body.specialite,
        groupe: req.body.groupe,
        email: req.body.email,
        niveau: req.body.niveau,
        aBinome: false,
        date: Date.now()
    });
    etu.save()
        .then(() => {

            console.log('lid est : ', etu._id);
            RoleU.role = 'Etudiant';
            RoleU.numerp = etu._id;
            const idf = req.body.idf;
            const mdp = req.body.mdp;
            const nomUtilisateur = req.body.nomUtilisateur;

            console.log('idf : ', idf, ' nomUtilisateur : ', nomUtilisateur, ' mdp : ', mdp);

            bcrypt.hash(mdp, 10)
                .then(hash => {
                    console.log('le mdp: ', hash);
                    const user = new UserModel({
                        idf: idf, mdp: hash, nomUtilisateur: nomUtilisateur, role: RoleU
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'compte etudiant et Utilisateur créé !' }))
                        .catch(error => {
                            EtudiantModel.findOneAndDelete({}, { "sort": { "date": -1 } }).then(et => {
                                const errors = creeErr(error);
                                console.log('erreur : ' + errors.IDF); res.status(202).send({ errors })
                            }
                            );

                        });
                })
                .catch(error => { 
                    const errors = creeErr(error); 
                    EtudiantModel.findOneAndDelete({}, { "sort": { "date": -1 } }).then(et=>{
                        console.log('erreur :' + error.keyPattern); 
                        res.status(206).json({ errors }) });
                    }); 
                    
        })
        .catch(error => { const errors = creeErr(error); console.log(errors.IDF); res.status(202).send({ errors }) });


}
//***************************** creer compte Enseignant ****************************/

module.exports.CreeCompteEnseignant = async (req, res) => {

    console.log('on affiche le req  ', req.body);
    var num = req.body.numero;
    const ens = new EnseingnantModel({
        grade: req.body.grade,
        specialite: req.body.specialite,
        numero: req.body.numero,
        email: req.body.email,
        etablissement: req.body.etablissement,

    });
    ens.save()
        .then(() => {

            console.log('lid est : ', ens._id);
            RoleU.role = 'Enseignant';
            RoleU.numerp = ens._id;
            const idf = req.body.idf;
            const mdp = req.body.mdp;
            const nomUtilisateur = req.body.nomUtilisateur;

            console.log('idf : ', idf, ' nomUtilisateur : ', nomUtilisateur, ' mdp : ', mdp);

            bcrypt.hash(mdp, 10)
                .then(hash => {
                    console.log('le mdp: ', hash);
                    const user = new UserModel({
                        idf: idf, mdp: hash, nomUtilisateur: nomUtilisateur, role: RoleU
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'compte enseignant et Utilisateur créé !' }))
                        .catch(error => {
                            EnseingnantModel.findOneAndDelete({ numero: num }, {}).then(en=>{
                                const errors = creeErr(error);
                                res.status(202).send({ errors })
                            });
                           
                        });
                })
                .catch(error => { 
                    EnseingnantModel.findOneAndDelete({ numero: num }, {}).then(en=>{
                        res.status(206).json({ error }) });
                    }); 
                    
        })
        .catch(error => {
            const errors = creeErr(error);
            res.status(202).send({ errors })
        });


}
//************************ cree compte en fonction du type  *************************/

module.exports.CreeCompte = async (req, res, type) => {

    UserModel.findOne({ idf: req.body.idf })
        .then(user => {
            if (!user) {
                return res.status(201).json({ error: 'Utilisateur non trouvé !' });
            }

            console.log('lid de lenseignant a modifier en ', type, ' : ', user.role.numerp);

            roleEnseignant.role = type;
            roleEnseignant.detail = req.body.detail;

            EnseingnantModel.findOneAndUpdate(

                { _id: user.role.numerp },
                { $pull: { roles: { role: type } } },
                { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) {
                        console.log('pas derreur' + ' Votre enseignant avais ce role : "' + type + '" il a ete supprimer maintenant on va lui ajuter le nouveau role !!');

                    } else {
                        console.log('erreur de mise a jour : ', err);
                        return res.status(202).json({ error: err });
                    }
                }
            )

            /****************** On ajoute le role **********/
            EnseingnantModel.findOneAndUpdate(
                { _id: user.role.numerp },
                { $addToSet: { roles: roleEnseignant } },
                { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) {
                        Notification.NewNotif(req.cookies.IDF, req.body.idf, 'vous avez été designé pour ce role : ' + type + ' ' + req.body.detail + '');
                        console.log('pas derreur'); return res.status(200).json({ message: 'Votre enseignant est : ' + type + ' maintenant !!' });

                    } else {
                        console.log('erreur de mise a jour : ', err);
                        return res.status(202).send({ error: err });
                    }
                }
            )


        })
        .catch(error => res.status(202).json({ error }));
}
//**************************** compte responsable  *********************************/

module.exports.CreeCompteResponsable = async (req, res) => {
    this.CreeCompte(req, res, 'responsable de specialite');
}
//**************************** compte Jury  ****************************************/

module.exports.CreeCompteJury = async (req, res) => {
    this.CreeCompte(req, res, 'Jury');
}

//********************** Commission de validation */
module.exports.CreeCompteCommission = async (req, res) => {
    this.CreeCompte(req, res, 'Commission');
}