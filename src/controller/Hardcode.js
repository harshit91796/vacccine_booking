const Calender = require('../model/Calender')

async function calender(req,res){
    
    try {
      for(let i=1;i<30;i++){
        
       const update = {day : {date : i, month : "june"},timeAvailable : ["10:00","10:30","11:00","11:30","12:00","12:30","1:00","2:00","2:30","3:00","3:30","4:00","4:30","5:00"]} 
        await Calender.create(update)
       }
       res.status(200).send({ msg: "Calendar objects created successfully" });
    } catch (error) {
     res.status(500).send({msg : error.message})
    }
 
 }


 module.exports = {calender}