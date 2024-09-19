const fs = require('fs');
const superagent = require('superagent');

const readFilePro = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

const writeFilePro = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err)
                reject(err);
            else
                resolve("success");
        });
    });
};
const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const resArray = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgArray = resArray.map(el => el.body.message);
        const status = await writeFilePro(`${__dirname}/dog-img.txt`, imgArray.join("\n"));
        console.log(status);
    }
    catch (err) {
        console.log(err);
        throw err;
    }

    return "2: Dog file Saved.";
};


(async () => {
    try {
        console.log("1: Ready to get dog image");
        const x = await getDogPic();
        console.log(x);
        console.log("3: Everything is done");
    }
    catch (err) {
        console.log("ERROR 💥" + err.message);
    }
})();