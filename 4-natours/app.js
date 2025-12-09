const express = require('express');

const app = express();
const morgan = require('morgan');

//1 - IMPORT THE ROUTERS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//2 - MIDDLEWARES
//Middleware - 1 (3rd Party) - helps in logging, returns URL called, status, time taken and size of file returned
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Middleware - 2
app.use(express.json()); //A middleware - that can modify incoming request data

//Static middleware
app.use(express.static(`${__dirname}/public`));

//3 - ROUTES
app.use('/api/v1/tours', tourRouter); //A middleware
app.use('/api/v1/users', userRouter);

module.exports = app;
