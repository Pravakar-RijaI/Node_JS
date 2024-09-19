const os = require('os');
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;

const fileOps = async () => {

    try {

        const data = await fsPromise.readFile(path.join(__dirname, "files", "simple-file.txt"), "utf-8");
        await fsPromise.writeFile(path.join(__dirname, "files", "newPromise.txt"), data);
        await fsPromise.appendFile(path.join(__dirname, "files", "newPromise.txt"), "\nThis is being appended.");
        await fsPromise.rename(path.join(__dirname, "files", "newPromise.txt"), path.join(__dirname, "files", "PromiseComp.txt"));
        await fsPromise.unlink(path.join(__dirname, "files", "PromiseComp.txt"));

    } catch (err) {

        console.log("Error Encountered" + err);

    }

};

fileOps();

/*
//core node modules
console.log(global);

console.log(__dirname);
console.log(__filename);

//os module
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
 */

/* 
//path module
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));
*/
/* 
fs.readFile(`${__dirname}/files/simple-file.txt`, "utf-8", (err, data) => {
    if (err)
        throw err;

    console.log(data);
    console.log("Read Operation Completed.");
});

fs.writeFile(path.join(__dirname, "files", "simple-write-file.txt"), "Nice to meet you!!", err => {
    if (err)
        throw err;

    console.log("Write Operation Completed.");


    fs.appendFile(path.join(__dirname, "files", "simple-write-file.txt"), "\nThis is from append Operation", err => {
        if (err)
            throw err;

        console.log("Append Operation Completed.");


        fs.rename(path.join(__dirname, "files", "simple-write-file.txt"), path.join(__dirname, "files", "simpleWriteFile.txt"), err => {
            if (err)
                throw err;

            console.log("Rename Operation Completed.");

            fs.unlink(path.join(__dirname, "files", "simpleWriteFile.txt"), (err) => {
                if (err)
                    throw err;

                console.log("Delete Operation Completed.");
            })
        })
    })
});
 */
process.on("uncaughtException", (err) => {
    console.log(`There was a unexpected error ${err}`);
    process.exit(1);
});