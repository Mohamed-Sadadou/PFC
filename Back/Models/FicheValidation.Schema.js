const mongoose = require('mongoose');

const FicheValidationSchema =  new mongoose.Schema(

    {
        membre:{
            type:String
        },
        reserves:{
            type:String
        },
        etat:{
            type: Boolean
        },
        date:{
            type:Date
          }


    }
);

module.exports = FicheValidationSchema;