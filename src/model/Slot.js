const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    doses: {
      type: Number,
      default: 0,
      required : true
    },
    age: {
      type: Number,
    },
    day : {
      
      date : {
        type: Number
      },
      month : {
        type : String
      }
     
     
    },
    slotTime : {
      type : String
    },
    phone : {
      type : String,
      unique : true
    },
    firstDose : {
      date : {
        type: Number
      },
      month : {
        type : String
      }
     
    }

  },
  { timestamps: true }
);

Slot = mongoose.model("Slot", SlotSchema);
 
module.exports = Slot;