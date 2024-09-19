const fs = require('fs');

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// //console.log(textIn);

// const textOut = `This is what we know about avocado: \n${textIn}.\n Created on ${Date.now()}`;

// // console.log(textOut);

// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File Written");

//Non-Blocking Asyncronous File Read
// fs.readFile("./txt/star.txt", "utf-8", (err, data) => {
//     console.log(data);
// });

// fs.readFile("./txt/star.txt", "utf-8", (err, data) => {
//     fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data) => {
//         console.log(data);
//     })
// });

// console.log("Reading...");
let newData;

fs.readFile("./txt/star.txt", "utf-8", (err, data1) => {
    if (err) return console.log("ERROR!! 💥")
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
            fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
                console.log("File is Writtten");
            })
        })
    })
});

console.log("Reading...");
