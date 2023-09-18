const mongoose = require("mongoose");

const CalenderSchema = new mongoose.Schema(
  {
    day : {
        date : {
            type: Number
          },
          month : {
            type : String
          }
    },
    slotsId : [],
    timeAvailable : ["10:00","10:30","11:00","11:30","12:00","12:30","1:00","2:00","2:30","3:00","3:30","4:00","4:30","5:00"],
    Available : {
        type : Boolean,
        default : true
    },
  
  },
  { timestamps: true }
);

Calender = mongoose.model("Calender", CalenderSchema);
 
module.exports = Calender;