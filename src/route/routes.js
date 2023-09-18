const express = require('express')
const router = express.Router()
const {register,Login,checkDays,checkTimeSlot,slotBook} = require('../controller/users')
const {updateSlotCalender, adminregister,adminLogin, filterUsers} = require('../controller/Admin')
const {hashPass} = require('../middleware/auth')
const { calender } = require('../controller/Hardcode')




//user

router.post('/register',hashPass,register)
router.post('/login',Login)
router.get('/checkDays',checkDays)
router.get('/checkTimeSlot',checkTimeSlot)
router.post('/bookSlot',slotBook)

//hardcode calender

router.post('/calender',calender)

//admin
router.post('/adminRegister',hashPass,adminregister)
router.post('/adminLogin',adminLogin)
router.post('/updateSlotsAvailibility',updateSlotCalender)
router.get('/filterUser',filterUsers)





module.exports = router

