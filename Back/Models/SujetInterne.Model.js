 const mongoose = require('mongoose');

 const SujetSchema = require("./Sujet.Schema");
 
const SujetInterneSchema =  new mongoose.Schema(

    {
        sujet:{
            type:SujetSchema
        },
        encadreur:{
            type:mongoose.Schema.Types.ObjectId
        },
        universite:{
            type: String
        }


    }
);


module.exports = mongoose.model('SujetInterne',SujetInterneSchema,'Sujet');



