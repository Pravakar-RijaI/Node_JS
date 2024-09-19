const mongoose = require('mongoose');
const PORT = 8000;

const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: `${__dirname}/config.env` });

const DB = process.env.DB_STRING;

mongoose.connect(DB)
    .then(() => console.log("Connected to MongoAtlas"))
    .catch((err) => console.log("Connection to MongoAtlas Failed --Error: \n" + err));

// console.log(app.get('env'));

// console.log(process.env);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});