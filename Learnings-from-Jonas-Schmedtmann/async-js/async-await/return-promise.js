const fs = require('fs');
const superagent = require('superagent');

const readFilePro = filePath => {
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
        const status = await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
        console.log(status);
    }
    catch (err) {
        console.log(err.message);
        throw err;
    }

    return "2: Dog Image 🐶 Saved";
};

/* console.log("1: Ready to get Dog Image");
getDogPic().then(x => {
    console.log(x)
    console.log("3: Work Completed");
});
 */

(async () => {
    try {
        console.log("1: Ready to get Dog Image");
        const x = await getDogPic();
        console.log(x);
        console.log("3: Work Completed");
    }
    catch (err) {
        console.log("ERROR 💥" + err.message);
    }
})();