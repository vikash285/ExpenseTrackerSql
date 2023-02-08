const path=require('path')
const express=require('express')
const rootDir=require('../util/path')
const router=express.Router()

router.get('/contactUs',(req,res)=>{
    res.send(`<form action="/success" method="POST">
    <label for="name">Name:</label><br><input type="text" id="name" name="name"><br>
    <label for="email">Email:</label><br><input type="email" id="email" name="email"><br>
    <button type="submit">Add Details</button>
    </form>`)
})

router.post('/success',(req,res)=>{
    res.send('<h1>Form successfully filled</h1>')
})

module.exports=router