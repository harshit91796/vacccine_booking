const User = require('../model/User')
const Slot = require('../model/Slot')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const Calender = require('../model/Calender')
dotenv.config()

async function register(req,res){
   try {
    const {name,phone,age,password,aadhar,pincode} = req.body
    if(phone.length !== 10){
      return res.status(400).send('phone length should be 10')
    }
    if(aadhar.length !== 12){
      return res.status(400).send('aadhar length should be 12')
    }
    if(pincode.length !== 6){
      return res.status(400).send('phone length should be 10')
    }

   const user = await User.create(req.body)
   res.status(200).send("user is created")
   } catch (error) {
    res.status(500).send({msg : error.message})
   }

}

async function Login(req,res){
    try {
     const {phone,password} = req.body
     if(phone.length !== 10){
      return res.status(400).send('phone length should be 10')
    }
    if(password.length < 6){
      return res.status(400).send('password length should be atleast 6')
    }
     const user = await User.findOne({phone : phone})
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

 //checkdays available

 async function checkDays(req,res){
   try {
   
    const days = await Calender.find({Available : true})
      res.status(200).send({status : true, data : days  })
    
    
   } catch (error) {
    res.status(500).send({msg : error.message})
   }

}

//check availabe time slot

async function checkTimeSlot(req,res){
   try {
      const day = req.body
      console.log(day)
    const slotDay = await Calender.findOne(req.body)
       const availableSlotTime = {
         slots : slotDay.timeAvailable
       }
       console.log(slotDay)
      res.status(200).send({status : true, data : availableSlotTime  })
    
    
   } catch (error) {
    res.status(500).send({msg : error.message})
   }

}

 //slot book

 async function slotBook(req,res){
   try {
      const {name , slotTime , age, doses, day,phone,todayDate} = req.body
      
      if(!name){
         return res.status(400).send('name required')
      }

      if(!slotTime){
         return res.status(400).send('slotTime required')
      }
      if(!age){
         return res.status(400).send('age required')
      }
      if(!phone){
         return res.status(400).send('phone required')
      }
      if(!todayDate){
         return res.status(400).send('todayDate : {date , month} required')
      }
      if(!day){
         return res.status(400).send('todayDate : {date , month} required')
      }

      if(phone.length !== 10){
         return res.status(400).send('phone length should be 10')
       }
   
      const user = await User.findOne({phone : phone})
      
      if(!user){
         return res.status(400).send("there is no user with such pgone number , please register first")
      }

      if(user.name !== name){
         return res.status(400).send("sorry your name doesnt match")
      }
      
      if(day.month === todayDate.month){
         if(day.date < todayDate.date){
            return res.status(400).send("you can not travell back in time")
         }
        
      }
      else{
         return res.status(400).send("slots only available for june month only")
      }
      

      const userSlot = await Slot.findOne({phone : phone})

     if(userSlot){
      if(userSlot.dose === 2){
         return res.status(400).send("you already taken ur both doses")
      }
         if(day.date - userSlot.firstDose.date >= 3){
            const updateSlot = await Slot.updateOne({phone : phone},{doses : userSlot.doses+1,firstDose : todayDate.date},{new : true})
            const userDose2 = await User.findByIdAndUpdate({_id : user._id},{secondDose : day})
         }
         else{
            return res.status(400).send("there should be atleast 2 days of gap between first dose and second")
         }
        
   
     }
     
 

     const userDose1 = await User.findByIdAndUpdate({_id : user._id},{firstDose : day,doses : 1})
    const slotDay = await Calender.findOneAndUpdate({day : day},{$push : {slotsId : user._id},$pull : {timeAvailable : slotTime}},{new : true})


     console.log(userDose1)
     const updateSlot = {firstDose : day, doses : 1, ...req.body}
     const slotCreate = await Slot.create(updateSlot)
      res.status(200).send({status : true, data : slotCreate })
    
    
   } catch (error) {
    res.status(500).send({msg : error.message})
   }

}

 

 

module.exports = {register,Login,checkDays,checkTimeSlot,slotBook}