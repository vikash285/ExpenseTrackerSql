const http=require('http')
const server=http.createServer((req,res)=>{
    if(req.url==='/home'){
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Welcome Home!</h1><body>')
    res.write('</html>')
    res.end()
    }
    else if(req.url==='/about'){
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Welcome to about us page!</h1><body>')
    res.write('</html>')
    res.end()
    }
    else if(req.url==='/node'){
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Welcome to my Node.js project!</h1><body>')
    res.write('</html>')
    res.end()
    }
})

server.listen(4000);