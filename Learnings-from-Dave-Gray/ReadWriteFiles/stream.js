const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, "files", "simple-file.txt"), { encoding: "utf-8" });

const ws = fs.createWriteStream(path.join(__dirname, "files", "simple-writeStream.txt"));

// rs.on("data", (chunk) => {
//     ws.write(chunk);
// });

rs.pipe(ws);