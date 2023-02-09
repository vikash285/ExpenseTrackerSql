const path=require('path')
const express=require('express')
const inquieryController=require('../controllers/inquiery')
const router=express.Router()

router.get('/contactUs',inquieryController.contactUs)

router.post('/success',inquieryController.postSuccess)

module.exports=router