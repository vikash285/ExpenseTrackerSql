exports.contactUs=(req,res)=>{
    res.send(`<form action="/success" method="POST">
    <label for="name">Name:</label><br><input type="text" id="name" name="name"><br>
    <label for="email">Email:</label><br><input type="email" id="email" name="email"><br>
    <button type="submit">Add Details</button>
    </form>`)
}

exports.postSuccess=(req,res)=>{
    res.send('<h1>Form successfully filled</h1>')
}