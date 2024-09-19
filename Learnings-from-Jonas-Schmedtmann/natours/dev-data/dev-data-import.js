const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../models/tourModel');

dotenv.config({ path: `${__dirname}/../config.env` });
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING);
    } catch (err) {
        console.log("DB Connection Failed\nError: " + err);
    }
}
dbConnect();

const tourData = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

const importData = async () => {
    try {
        await Tour.create(tourData);
        console.log("Data import Success");
    } catch (err) {
        console.log("Data import Unsuccessful\nError: " + err);
    }
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data delete Success");
    } catch (err) {
        console.log("Data delete Unsuccessful\nError: " + err);
    }
};

const runTerminal = (data) => {
    data.forEach(el => {
        if (el === "--import") {
            importData();
        }
        if (el === "--delete") {
            deleteData();
        }
    })
};

runTerminal(process.argv);