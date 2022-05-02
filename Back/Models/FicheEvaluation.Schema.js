
const mongoose = require('mongoose');



const FicheEvaluation = new mongoose.Schema(

  {
    jury: {
      type: String
    },
    note: {
      type: Number
    },
    remarque: {
      type: String
    },
    date: {
      type: Date
    },
    final:{
      type:Boolean
    }


  }
);

module.exports = FicheEvaluation;