const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
    const { pathname, query } = url.parse(request.url);

    if (pathname === "/" || pathname === "/overview")
        response.end("Welcome to the server!!");
    else if (pathname === "/product")
        response.end("Welcome to Product Page!!");
    else {
        response.writeHead(404, { "Content-type": "text/html" });
        response.end("<h1>Page not Found</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening from port 8000...");
})