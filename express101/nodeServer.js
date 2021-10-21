const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log(req.url);

    if(req.url === '/') {
        const htmlContent = fs.readFileSync('./home.html');

        res.writeHead(200, {'content-type': 'text/html'});
        res.write(htmlContent);
        return res.end();
    }

    if(req.url === '/node.png') {
        const file = fs.readFileSync('./node.png');

        res.writeHead(200, {'content-type': 'image/png'});
        res.write(file);
        return res.end();
    }

    if(req.url === '/styles.css') {
        const file = fs.readFileSync('./styles.css');

        res.writeHead(200, {'content-type': 'text/css'});
        res.write(file);
        return res.end();
    }

    res.writeHead(404, {'content-type': 'text/html'});
    res.write('<h4>Oups! Nothing here!</h4>');
    res.end();
});

server.listen(3000);