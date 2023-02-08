const express=require('express')
const fs=require('fs')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            data='No chat exists'
        }
        res.send(
            `${data}<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" 
            action="/post" method="POST">
            <input id="message" type="text" name="message" placeholder="message">
            <input id="username" type="hidden" name="username">
            <button type="submit">Send</button>
            </form>`)
    }) 
})

app.post("/post",(req,res)=>{
    fs.writeFile('username.txt',`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
        err?console.log(err):res.redirect("/")
    })
})

app.get('/login',(req,res)=>{
    res.send(`<form onsubmit="localStorage.setItem('username',document.getElementById('username').value)" 
    action="/login" method="POST">
    <input id="username" type="text" name="username">
    <button type="submit">Send</button>
    </form>`)
})

app.post('/login',(req,res)=>{
    res.redirect('/')
})

app.listen(3000)