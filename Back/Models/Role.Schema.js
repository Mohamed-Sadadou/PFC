const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
    role:{
        type: String

        },
   detail:{
      type:String
         }
        }
);

module.exports = roleSchema;