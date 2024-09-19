const fs = require("fs");
const http = require("http");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .end((err, res) => {
            console.log(res.body.message);
            fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, err => {
                console.log("Random dog image saved to file.");
            });
        });
});