const newEvent = require('events');
const logger = require('./logEvents');

class Emitter extends newEvent {
    constructor() {
        super();
    }
}

const myEmitter = new Emitter();

myEmitter.on("log", (msg) => {
    logger(msg);
});

myEmitter.emit("log", "Logging into Application");