const event = require('events');
const http = require('http');

class Sales extends event {
    constructor() {
        super();
    }
}
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
    console.log("There was a new Sale!!");
});

myEmitter.on("newSale", () => {
    console.log("Customer name: Gonas");
});

myEmitter.on("newSale", stock => {
    console.log(`There is ${stock} items left in the stock.`);
});

myEmitter.emit("newSale", 99);

///////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Request received...");
    res.end("Request received");
});

server.on("request", (req, res) => {
    console.log("Another request");
});

server.on("close", () => {
    console.log("Server Closed 🚫");
});

server.listen(8000, "127.0.0.2", () => {
    console.log("Listening on port 8000...");
});