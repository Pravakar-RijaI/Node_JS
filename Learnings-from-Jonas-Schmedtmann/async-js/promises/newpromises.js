const fs = require('fs');
const superagent = require('superagent');

const readFilePro = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err)
                reject("Some Technical Diffculties" + err.message);
            else
                resolve(data);
        });
    });
};

const writeFilePro = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err)
                reject("Some Technical Difficulties" + err.message);
            else
                resolve("success");
        });
    });
};


readFilePro(`${__dirname}/dog.txt`)
    .then((data) => {
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
            .then(res => {
                return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message)
            }).then(res => {
                console.log(res);
            });
    }).catch(err => {
        console.log(err);
    });