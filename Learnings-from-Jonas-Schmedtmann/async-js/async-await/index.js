const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err)
                reject("Technical Difficulty" + err.message);
            else
                resolve(data);
        });
    });
};

const writeFilePro = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err)
                reject("Technical Difficulty" + err.message);
            else
                resolve("success");
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
        console.log("Random dog image saved to file.");
    }
    catch (error) {
        console.log(error);
    }
};

getDogPic();