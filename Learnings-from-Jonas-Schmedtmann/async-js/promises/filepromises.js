const fs = require('fs');
const superagent = require('superagent');

const readFilePro = filepath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, "utf-8", (err, data) => {
            if (err)
                reject("Some techincal diffculty..");
            else
                resolve(data);
        });
    });
};

const writeFilePro = (filepath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, data, (err) => {
            if (err)
                reject("Some Techincal Diffculty..");
            else
                resolve("success");
        });
    });
};


readFilePro(`${__dirname}/dog.txt`).then(data => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res => {
        return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message)
    }).then((res) => console.log(res));
}).catch(err => console.log(err));