const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res => {
        fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => {
            if (err)
                console.log("Data couldnot be written.");
            else
                console.log("Data written successfully.");
        });
    }).catch(err => {
        console.log(err.message);
    });
});