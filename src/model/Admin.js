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
      specialKey: {
        type: Number,
        required : true
      }
    },
    { timestamps: true }



)

const Admin = mongoose.model('Admin',userSchema)

module.exports = Admin