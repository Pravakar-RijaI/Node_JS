const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on("request", (req, res) => {
    //Solution 1
    /*fs.readFile("./test-file.txt", "utf-8", (err, data) => {
        if (!err) {
            res.end(data);
        }
        else
            res.end("Error in fetching data...");
    });*/

    //Solution 2
    /*const readable = fs.createReadStream("./test-file.txt");
    readable.on("data", chunk => {
        res.write(chunk);
    });

    readable.on("end", () => {
        res.end();
        console.log("End of file reached.");
    });

    readable.on("error", (error) => {
        console.log(error);
        res.statusCode = 500;
        res.end("Technical Diffculty!");
    }*/

    //Solution 3
    const readable = fs.createReadStream("./test-file.txt");
    readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening on port 8000...");
});