const UserModel = require('../Models/Utilisateur.Model');
const RoleU = require('../Models/RoleUser.Schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectId = require('mongoose').Types.ObjectId;

const Enseignant = require('../Models/Enseignant.Model');

const maxAge = 24*60*60*100;


//***************** creer un jeton adapté *****/

const createToken = (id) => {
    return jwt.sign({ userId: id }, 'Token_secret_PFE', { expiresIn: maxAge })
    
}
//***************************** creer compte utilisateur */

module.exports.CreeCompte = async (req, res) => {
    console.log('on affiche le req  ', req.body);
    const role = 'admin';
    const numerp = '60af9d1bed0b400e00ba47de';
    RoleU.role = role;
    RoleU.numerp = numerp;
    const { idf, mdp, nomUtilisateur } = req.body;
    console.log('idf : ', idf, ' nomUtilisateur : ', nomUtilisateur, ' mdp : ', mdp);

    bcrypt.hash(mdp, 10)
        .then(hash => {
            console.log('le mdp: ', hash);
            const user = new UserModel({
                idf: idf, mdp: hash, nomUtilisateur: nomUtilisateur, role: RoleU
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

}
module.exports.CreeCompte1 = async () => {
    //console.log('on affiche le req  ', req.body);
    const role = 'admin';
    const numerp = '60af9d1bed0b400e00ba47de';
    RoleU.role = role;
    RoleU.numerp = numerp;
    const idf = 101010101010;
    const mdp = 'mdp123';
    const nomUtilisateur = 'Admin';
    //const { idf, mdp, nomUtilisateur } = req.body;
    console.log('idf : ', idf, ' nomUtilisateur : ', nomUtilisateur, ' mdp : ', mdp);

    bcrypt.hash(mdp, 10)
        .then(hash => {
            console.log('le mdp: ', hash);
            const user = new UserModel({
                idf: idf, mdp: hash, nomUtilisateur: nomUtilisateur, role: RoleU
            });
            user.save()
                .then(() => console.log("ok creer"))
                .catch(error =>  console.log("erreur"));
        })
        .catch(error =>console.log("erreur"));

}


//***************** Se connecter ****/


module.exports.SeConnecter = async function SeConnecter (req, res, next)  {
    
    await UserModel.findOne({ idf: req.body.idf })
        .then(user => {
            if (!user) {
                return res.status(201).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.mdp, user.mdp)
                .then(valid => {
                    if (!valid) {
                        return res.status(202).json({ error: 'Mot de passe incorrect !' });
                    }
                    const token = createToken(user._id);
                    const role = createToken(user.role.role);
                    
                    console.log('le role : ',user.role.role);
                    console.log('CONNECTER');
                    if(user.role.role == 'Enseignant' ){
                        console.log('on est dans le cas enseignant ');
                        Enseignant.findOne({ _id: user.role.numerp })
                        .then(ens => {
                            console.log('enseignant trouvé ');
                            if (!ens) {
                                return res.status(203).json({ error: 'Utilisateur non trouvé !' });
                            }
                            roles=ens.roles;
            
                            console.log('enseignant roles  ', roles[2]);
                            if( ens != null ){
                                res.cookie('jwt', token ,{ httpOnly:true , maxAge} );
                                res.cookie('role',role ,{ httpOnly:true , maxAge} );
                                res.cookie('IDF',(req.body.idf).replace(/ /g,""),{ httpOnly:true , maxAge});
                                res.cookie('UserName',user.nomUtilisateur,{ httpOnly:true , maxAge});
                                res.cookie('roles',roles,{ httpOnly:true , maxAge});
                                res.status(200).json({user:user._id,role:user.role.role,IDF:req.body.idf,Roles:roles});
                            }
                            

                        })
                        .catch(error => res.status(500).json({ error }));
                    }else{
                    res.cookie('jwt', token ,{ httpOnly:true , maxAge} );
                    res.cookie('role',role ,{ httpOnly:true , maxAge} );
                    res.cookie('IDF',(req.body.idf).replace(/ /g,""),{ httpOnly:true , maxAge});
                    res.cookie('UserName',user.nomUtilisateur,{ httpOnly:true , maxAge});
                    res.status(200).json({user:user._id,role:user.role.role,IDF:req.body.idf});
                }

                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//******************************* Se deconnecter  */

module.exports.Deconnection = (req, res)=>{
    console.log('ON va se deconnecter');
    res.cookie('jwt','',{maxAge: 1});
    res.cookie('role','',{maxAge: 1});
    res.cookie('IDF','',{maxAge: 1});
    res.cookie('UserName','',{maxAge: 1});
    res.cookie('roles','',{maxAge: 1});
   
    res.status(200).json('/');
}
//***************** afficher tout les utilisateurs *****/

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-mdp');
    res.status(200).json(users);
}

//***************** afficher un seul utilisateur *****/

module.exports.getUsers = (req, res) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send('id inconnu de la database : ' + req.params.id);

    UserModel.findById(req.params.is, (err, docs) => {
        if (!err) res.send(docs);
        else console.log(' on a un souci : ' + err);
    }).select('-mdp');
};

//***************************************************************************** modification d utilisateur **********************************/


//***************** modification du nom d'utilisateur **********/

module.exports.ModifiUsername = async (req, res) => {
    console.log(req.body.id);
    if (!ObjectId.isValid(req.body.id)) return res.status(400).send('id inconnu de la database : ' + req.body.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.body.id },
            { $set: { nomUtilisateur: req.body.nomUtilisateur } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err){ console.log("---- ok ----"); return res.status(200).json(docs);}
                else{ return res.status(500).send({ message: err });}
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

//***************** modification du mot de passe   ***********/

module.exports.ModifiUserpassword = async (req, res) => {
    console.log(req.body.id);
    if (!ObjectId.isValid(req.body.id)) return res.status(400).send('id inconnu de la database : ' + req.body.id);

    console.log('on fait le try de modifie password');
    const salt = await bcrypt.genSalt();
    req.body.mdp = await bcrypt.hash(req.body.mdp, salt);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.body.id },
            { $set: { mdp: req.body.mdp } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log('ok'); return res.status(200).json(docs); }
                else return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

//***************** modification le role  **********/

module.exports.Modifirole = async (req, res) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send('id inconnu de la database : ' + req.params.id);

    const role = require('../Models/RoleUser.Schema');

    role.role = req.body.role;
    role.numerp = req.body.num

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { role: role } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

//***************** supprimer utilisateur  *****/
module.exports.SupprimeUser = async (req, res) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send('id inconnu de la database : ' + req.params.id);

    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Suppression effectuer avec succes. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}