const fs=require("fs");
const http=require("http")
const path=require("path")


fs.writeFile("index.html","<h1>Hello World</h1>", err=>{console.log(err)})


http.createServer((req,res)=>{

    fs.readFile(path.join(__dirname,"ind.html"),{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.write(data)
            res.end(data)
        }
    })

}).listen(3000)
