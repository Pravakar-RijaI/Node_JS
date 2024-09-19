const fs = require('fs');

if (!(fs.existsSync('./new'))) {
    fs.mkdir('./new', (err) => {
        if (err)
            throw err;
        console.log("Directory Created.");
    });
}
else {
    console.log("Directory Already Created.");
}

process.on("uncaughtException", (err) => {
    console.log("Error: " + err);
    process.exit(1);
})