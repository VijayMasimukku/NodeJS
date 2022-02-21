const fs= require("fs");
const http=require("http");
const server=http.createServer((req,res)=>{
    fs.readFile("D:\\NodeJs\\NodeJS\\assignments\\assignment_2\\index.html", {encoding:"utf-8"},(err,data)=>{
        res.end(data)
    })

})
server.listen(3000, ()=>{
    console.log("server is listing")
});