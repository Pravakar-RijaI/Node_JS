const express = require('express');

const app = express();

const AppError = require('./utlis/appError');
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        console.log("Hello from Middleware.👋");
        req.requestTime = new Date().toISOString();
        next();
    });
}

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.use('*', (req, res, next) => {
    // const err = new Error(`There is no resources at ${req.originalUrl}`);
    // err.statusCode = 400;
    // err.status = "fail";
    next(new AppError(`There is no resources at ${req.originalUrl}`, 400));
});

app.use(globalErrorHandler);

module.exports = app;