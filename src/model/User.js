const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
      },
      phone: {
        type: String,
        required: true,
      
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 6,
      },
      age: {
        type: Number,
        required : true
      },
      aadhar: {
        type: String,
        required : true
      },
     pincode : {
       type : String,
       required : true
     },
     doses : {
      type : Number,
      default : 0,

     },
     firstDose : {
      date : {
        type: Number
      },
      month : {
        type : String
      }
     },
     secondDose : {
      date : {
        type: Number
      },
      month : {
        type : String
      }
     }
    },
    { timestamps: true }



)

const User = mongoose.model('user',userSchema)

module.exports = User