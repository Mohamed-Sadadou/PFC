const mongoose = require('mongoose');
const SujetSchema = require("./Sujet.Schema");

const SujetExtereneSchema =  new mongoose.Schema(

    {
        sujet:{
            type:SujetSchema
        },
        etablissment:{
            type:String
        },
        copromoteur:{
            type: mongoose.Schema.Types.ObjectId
        }


    }
);

module.exports = mongoose.model('SujetExterene',SujetExtereneSchema,'Sujet');