const sujet = require('../Models/Sujet.Schema');
const sujetinterne = require('../Models/SujetInterne.Model');
const Utilisateur = require('../Models/Utilisateur.Model');
const sujetexterne = require('../Models/SujetInterne.Model');
const Sujet = require('../Models/SujetInterne.Model');
const ficheEvaluation = require('../Models/FicheEvaluation.Schema');
const ficheValidation = require('../Models/FicheValidation.Schema');
const UserModel = require('../Models/Utilisateur.Model');
const Binome = require('../Models/Binome.Model');
const etu1 = require('../Models/Etudiant.Model');
const etu2 = require('../Models/Etudiant.Model');
const RoleU = require('../Models/RoleUser.Schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//**************************************************************************************************************/

module.exports.GetEtu= async function GetEtu(req,res){
    const queryObj = {};
    queryObj["role.role"] ="Etudiant";
    await UserModel.aggregate([
        {$match:queryObj},{
            $lookup:{
                from:"etudiantschemas",
                localField:"role.numerp",
                foreignField:"_id",
                as:"etudiant"
            }
        }
    ]).then(users=>{
        console.log(users);
        res.status(200).json(users);
    }).catch();
};


module.exports.GetEtu1= async function GetEtu1(req,res){
    console.log('---------------------------')
    console.log('---------------------------')
    console.log('---------------------------')
    console.log('---------------------------')
    const queryObj = {};
    queryObj["role.role"] ="Etudiant";
    queryObj[req.body.filtre1] =req.body.champ1;
    await UserModel.aggregate([
        {$match:queryObj},{
            $lookup:{
             
                from:"etudiantschemas",
                localField: "role.numerp",
                 foreignField: "_id",
                as:"etudiant",
                
            }
        }
    ]).then(users=>{
        console.log(users[0]);
        if(users[0].etudiant.length!=1){console.log('status 201'); res.status(201).json(null)}
        else res.status(200).json(users);
    }).catch((err)=>console.log('erreur !!!!',err));
};

module.exports.GetEtu1F= async function GetEtu1F(req,res){
    const queryObj = {};
    console.log('*****************************************')
    console.log('*****************************************')
    console.log('*****************************************')
    console.log('le filtre : ',req.body.filtre1,' : ',req.body.champ1)
    console.log('*****************************************')
    console.log('*****************************************')
    console.log('*****************************************')
    queryObj["role.role"] ="Etudiant";
    await UserModel.aggregate([
        {$match:queryObj},{
            $lookup:{
             
                from:"etudiantschemas",
                let:{id:"$role.numerp",},
                as:"etudiant",
                pipeline:[{
                    $match:{$expr:{$and:[{$eq:["$$id","$_id"]},{$eq:["$"+req.body.filtre1,req.body.champ1]}]}}
                }]
            }
        }
    ]).then(users=>{
      //  console.log(users[0]);
      console.log('*****************************************')
      console.log('*****************************************')
      console.log(users[4]);
      console.log('*****************************************')
      console.log('*****************************************')
        if(!users){console.log('status 201'); res.status(201).json(null)}
        else res.status(200).json(users);
    }).catch((err)=>console.log('erreur !!!!',err));
};

module.exports.GetEtu2F= async function GetEtu2F(req,res){
    const queryObj = {};
    queryObj["role.role"] ="Etudiant";
    await UserModel.aggregate([
        {$match:queryObj},{
            $lookup:{
             
                from:"etudiantschemas",
                let:{id:"$role.numerp",},
                as:"etudiant",
                pipeline:[{
                    $match:{$expr:{$and:[{$eq:["$$id","$_id"]},{$eq:["$"+req.body.filtre1+"",req.body.champ1]},{$eq:["$"+req.body.filtre2+"",req.body.champ2]}]}}
                }]
            }
        }
    ]).then(users=>{
        console.log(users[0]);
        if(!users){console.log('status 201'); res.status(201).json(null)}
        else res.status(200).json(users);
    }).catch();
};

module.exports.GetEtu3F= async function GetEtu3F(req,res){
    const queryObj = {};
    queryObj["role.role"] ="Etudiant";
    await UserModel.aggregate([
        {$match:queryObj},{
            $lookup:{
             
                from:"etudiantschemas",
                let:{id:"$role.numerp",},
                as:"etudiant",
                pipeline:[{
                    $match:{$expr:{$and:[{$eq:["$$id","$_id"]},{$eq:["$"+req.body.filtre1+"",req.body.champ1]},{$eq:["$"+req.body.filtre2+"",req.body.champ2]},{$eq:["$"+req.body.filtre3+"",req.body.champ3]}]}}
                }]
            }
        }
    ]).then(users=>{
        console.log(users[0]);
        if(!users){console.log('status 201'); res.status(201).json(null)}
        else res.status(200).json(users);
    }).catch();
};

module.exports.GetEtu4F= async function GetEtu4F(req,res){
    const queryObj = {};
    queryObj["role.role"] ="Etudiant";
    await UserModel.aggregate([
        {$match:queryObj},{
            $lookup:{
             
                from:"etudiantschemas",
                let:{id:"$role.numerp",},
                as:"etudiant",
                pipeline:[{
                    $match:{$expr:{$and:[{$eq:["$$id","$_id"]},{$eq:["$"+req.body.filtre1+"",req.body.champ1]},{$eq:["$"+req.body.filtre2+"",req.body.champ2]},{$eq:["$"+req.body.filtre3+"",req.body.champ3]},{$eq:["$"+req.body.filtre4+"",req.body.champ4]}]}}
                }]
            }
        }
    ]).then(users=>{
        console.log(users[0]);
        if(!users){console.log('status 201'); res.status(201).json(null)}
        else res.status(200).json(users);
    }).catch();
};


//**************************************************************************************************************/

module.exports.GetEtudiant = async function GetEtudiant(req, res) {


    Etudiants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Etudiant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Etudiant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;

        console.log('la querry object : ', queryObj);
        console.log('nos users avec Etudiant : ', Userss[i].idf);
        await etu1.findOne(queryObj).then(etuu => {
            console.log('le resulta du fiind one : ', etuu);
            if (etuu != null) {
                let Etu = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "section": etuu.section,
                    "specialite": etuu.specialite,
                    "groupe": etuu.groupe,
                    "email": etuu.email,
                    "niveau": etuu.niveau,
                    "aBinome": etuu.aBinome

                }
                Etudiants.push(Etu);
            }
        }).catch((err) => { res.status(200).json('pas d Etudiant '); });

    };
    console.log('nos etudiant donc : ', Etudiants);
    res.status(200).json(Etudiants);
};

module.exports.EtudiantParUnFiltre = async function GetEtudiant(req, res) {

    Etudiants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Etudiant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Etudiant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;
        queryObj[req.body.filtre1] = req.body.champ1;

        console.log('la querry object : ', queryObj);
        console.log('nos users avec Etudiant : ', Userss[i].idf);
        await etu1.findOne(queryObj).then(etuu => {
            console.log('le resulta du fiind one : ', etuu);
            if (etuu != null) {
                let Etu = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "section": etuu.section,
                    "specialite": etuu.specialite,
                    "groupe": etuu.groupe,
                    "email": etuu.email,
                    "niveau": etuu.niveau,
                    "aBinome": etuu.aBinome

                }
                Etudiants.push(Etu);
            }
        }).catch((err) => { res.status(200).json('pas d Etudiant '); });

    };
    console.log('nos etudiant donc : ', Etudiants);
    res.status(200).json(Etudiants);
};

module.exports.EtudiantParDeuxFiltre = async function GetEtudiant(req, res) {

    Etudiants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Etudiant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Etudiant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;
        queryObj[req.body.filtre1] = req.body.champ1;
        queryObj[req.body.filtre2] = req.body.champ2;

        console.log('la querry object : ', queryObj);
        console.log('nos users avec Etudiant : ', Userss[i].idf);
        await etu1.findOne(queryObj).then(etuu => {
            console.log('le resulta du fiind one : ', etuu);
            if (etuu != null) {
                let Etu = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "section": etuu.section,
                    "specialite": etuu.specialite,
                    "groupe": etuu.groupe,
                    "email": etuu.email,
                    "niveau": etuu.niveau,
                    "aBinome": etuu.aBinome

                }
                Etudiants.push(Etu);
            }
        }).catch((err) => { res.status(200).json('pas d Etudiant '); });

    };
    console.log('nos etudiant donc : ', Etudiants);
    res.status(200).json(Etudiants);
};

module.exports.EtudiantParTroisFiltre = async function GetEtudiant(req, res) {


    Etudiants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Etudiant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Etudiant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;
        queryObj[req.body.filtre1] = req.body.champ1;
        queryObj[req.body.filtre2] = req.body.champ2;
        queryObj[req.body.filtre3] = req.body.champ3;

        console.log('la querry object : ', queryObj);
        console.log('nos users avec Etudiant : ', Userss[i].idf);
        await etu1.findOne(queryObj).then(etuu => {
            console.log('le resulta du fiind one : ', etuu);
            if (etuu != null) {
                let Etu = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "section": etuu.section,
                    "specialite": etuu.specialite,
                    "groupe": etuu.groupe,
                    "email": etuu.email,
                    "niveau": etuu.niveau,
                    "aBinome": etuu.aBinome

                }
                Etudiants.push(Etu);
            }
        }).catch((err) => { res.status(200).json('pas d Etudiant '); });

    };
    console.log('nos etudiant donc : ', Etudiants);
    res.status(200).json(Etudiants);
};

module.exports.EtudiantParQuatreFiltre = async function GetEtudiant(req, res) {

    Etudiants = [];
    Userss = [];
    await UserModel.find({ 'role.role': 'Etudiant' })
        .then(users => {
            Userss = users;
        })
        .catch((err) => { res.status(200).json('pas d Etudiant '); });
    for (i = 0; i < Userss.length; i++) {
        console.log('dans la boucle');
        const queryObj = {};
        queryObj['_id'] = Userss[i].role.numerp;
        queryObj[req.body.filtre1] = req.body.champ1;
        queryObj[req.body.filtre2] = req.body.champ2;
        queryObj[req.body.filtre3] = req.body.champ3;
        queryObj[req.body.filtre4] = req.body.champ4;
        console.log('la querry object : ', queryObj);
        console.log('nos users avec Etudiant : ', Userss[i].idf);
        await etu1.findOne(queryObj).then(etuu => {
            console.log('le resulta du fiind one : ', etuu);
            if (etuu != null) {
                let Etu = {
                    "IDF": Userss[i].idf,
                    "NomUtilisateur": Userss[i].nomUtilisateur,
                    "role": Userss[i].role.role,
                    "section": etuu.section,
                    "specialite": etuu.specialite,
                    "groupe": etuu.groupe,
                    "email": etuu.email,
                    "niveau": etuu.niveau,
                    "aBinome": etuu.aBinome

                }
                Etudiants.push(Etu);
            }
        }).catch((err) => { res.status(200).json('pas d Etudiant '); });

    };
    console.log('nos etudiant donc : ', Etudiants);
    res.status(200).json(Etudiants);

};