const fsPromise = require('fs').promises;
const { v4: uuid } = require('uuid');
const date = require('date-fns');
const path = require('path');


const logger = async (message) => {
    const dateTime = date.format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const log = `${dateTime} ${uuid()} ${message}\n`;

    await fsPromise.appendFile(path.join(__dirname, "logs", "logs.txt"), log);
};

module.exports = logger;