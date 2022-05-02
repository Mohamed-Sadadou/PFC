const jwt = require('jsonwebtoken');
const UserModel = require('../Models/Utilisateur.Model');
const url = require('url');

module.exports.ChekUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('on chek ce token :',token);
    if(token){
        jwt.verify(token,'Token_secret_PFE',async(err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                res.cookies('jwt','',{maxAge:1});
                next();
            }else{
                let user = await UserModel.findById(decodedToken._id);
                res.locals.user = user;
                console.log(user);
                next();
            }
        }
        )
    }else{
        console.log('mauvais token');
        res.locals.user=null;
        return res.status(404).json({ error: 'ta pas le droit frere' });
        //res.render('/');
        //next();
    }
  
};


module.exports.chekType = ( req, res , next ,type)=>{
    const role = req.cookies.role;
    console.log('on chek ce token :',role);
    if(role){
        jwt.verify(role,'Token_secret_PFE',async(err,decodedrole)=>{
            if(err){
                res.locals.user = null;
                res.cookies('jwt','',{maxAge:1});
                next();
            }else{
               
                console.log('voila le role :',decodedrole.userId);
               if(decodedrole.userId== type){
                   next();
               }else{
                console.log('mauvais token');
                res.locals.user=null;
                

                 res.status(201).json({ error: 'ta pas le droit frere' });
               }
                
            }
        }
        )
    }else{
        console.log('mauvais token');
        res.locals.user=null;
       
        res.status(201).json({ error: 'ta pas le droit frere' });
    
    }
  
}

module.exports.chekAdmin = (req, res, next) => {
    this.chekType(req,res,next,'admin');
};

module.exports.chekEtudiant = (req, res, next) => {
    this.chekType(req,res,next,'Etudiant');
};

module.exports.chekEnseignant = (req, res, next) => {
    this.chekType(req,res,next,'Enseignant');
};

module.exports.chekBinome = (req, res, next) => {
    this.chekType(req,res,next,'Binome');
};

module.exports.ChekTout=(req,res,next)=>{
    const token = req.cookies.jwt;
    const role = req.cookies.role;
    console.log('on chek ce token :',token);
    console.log('on chek ce token :',role);
    if(token){
        jwt.verify(token,'Token_secret_PFE',async(err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                res.cookies('jwt','',{maxAge:1});
                console.log('on va retourné 201')
                next();
                res.status(201).json();
            }else{
                if(role){
                    jwt.verify(role,'Token_secret_PFE',async(err,decodedrole)=>{
                        if(err){
                            res.locals.user = null;
                            res.cookies('role','',{maxAge:1});
                            next();
                        }else{

                            console.log('les roles ',req.cookies.roles)
                            console.log('on va send la request et les context !!! '+'id:'+decodedToken.userId,'role:'+decodedrole.userId,'IDf:'+req.cookies.IDF)
                            res.status(200).json({id:decodedToken.userId,role:decodedrole.userId,IDF:req.cookies.IDF,UserName:req.cookies.UserName,Roles:req.cookies.roles})
                        }
                    }
                    )
                }else{
                    console.log('mauvais token');
                    

                    res.status(201).json({ error: 'ta pas le droit frere' });
                    //res.render('/');
                    //next();
                }
            }
        }
        )
    }else{
        console.log('mauvais token');
        res.status(201).json({ error: 'ta pas le droit frere' });
        //res.render('/');
        //next();
    }
}
