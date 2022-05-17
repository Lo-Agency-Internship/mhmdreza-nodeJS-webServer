let http = require('http');
let fs = require("fs");
let path = require("path");
let url = require('url'); 

http.createServer(function (req, res)
{

    let name ="."+ req.url;
    console.log(name);


    if (name === "./") {
        fs.readFile("index.html", (err,content)=>{
            if(err){
                res.writeHead(404 ,{"Content-Type": `text/html`});
                res.end("Error 404 Page not found!");
            }
            res.writeHead(200, {"Content-Type": `text/html`});
            res.write(content);
            res.end();
        })
        
    }
    else{
        let extnamee = path.extname(name);
        let pathextname=extnamee.slice(1,extnamee.length);
        console.log("extnamee :"+extnamee);
        console.log("pathextname :"+pathextname);
        fs.readFile(`${name}`,(err,content)=>{
            if(err){
            console.log(err)
            res.writeHead(404 ,{"Content-Type":`text/${pathextname}`})
            res.end("Error 404 Page not found!");
            }
            else{
                if (pathextname!==null) {
                    res.writeHead(200,{"Content-Type":`text/${pathextname}`})
                }
                else
                {
                    res.writeHead(404 ,{"Content-Type":`text/${pathextname}`})
                    res.write("Error 404 Not Found!")
                    res.end();
                }
                res.write(content)
                res.end();
            }
        })
    }





}).listen(8080)
