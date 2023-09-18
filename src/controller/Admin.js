const Slot = require('../model/Slot');
const User = require('../model/User')
const Calender = require('../model/Calender')
const { findById } = require('../model/User');
const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

//register admin

async function adminregister(req,res){
    try {
     const {name,phone,specialKey,password} = req.body
     if(phone.length !== 10){
       return res.status(400).send('phone length should be 10')
     }
     if(!specialKey){
       return res.status(400).send('special key needed')
     }
     if(!name){
       return res.status(400).send('name required')
     }
     if(!password){
        return res.status(400).send('password required')
      }
 
    const user = await Admin.create(req.body)
    res.status(200).send("user is created")
    } catch (error) {
     res.status(500).send({msg : error.message})
    }
 
 }

 //admin login
 
async function adminLogin(req,res){
    try {
     const {phone,password,specialKey} = req.body
     if(phone.length !== 10){
      return res.status(400).send('phone length should be 10')
    }
    if(password.length < 6){
      return res.status(400).send('password length should be atleast 6')
    }
    

     const user = await User.findOne({phone : phone})

     if(user.specialKey !== specialKey){
        return res.status(400).send('invalid credential')
     }
     const hash = await bcrypt.compare(password,user.password)

     if(hash){
       const token = jwt.sign({userId : user._id},process.env.secret_key)
       res.setHeader('X-api-key',token)
       res.status(200).send({status : true, data : token ,message : "user is logged in"})
     }
     else{
      return res.status(400).send('invalid credential')
     }
     
    } catch (error) {
     res.status(500).send({msg : error.message})
    }
 
 }

 // Filter Users by Age/Pincode/Vaccination Status

async function filterUsers(req, res) {
    try {
      const { age, pincode, doses } = req.query;
      
      let filterQuery = {};
  
      if (age) {
        filterQuery.age = age;
      }
  
      if (pincode) {
        filterQuery.pincode = pincode;
      }
  
      if (vaccinationStatus) {
        filterQuery.doses = parseInt(doses); 
      }
  
      const filteredUsers = await User.find(filterQuery);
  
      res.status(200).send({ status: true, data: filteredUsers });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }


//update slots availibity

  
async function updateSlotCalender(req,res){
    
    try {
       const days = await Calender.find({available : true})
       const updateall = Promise.all.days.map(async (x)=>{
             if(x.slotId.length === 14){
               const updated = await Calender.findByIdAndUpdate({id: x._id },{available : false},{new : true})
             }
            
       })
       res.status(200).send({data : updateall, msg : "Slot has been updated"});
    } catch (error) {
        res.status(500).send({msg : error.message})
    }
}




module.exports = {updateSlotCalender,adminregister,adminLogin,filterUsers}