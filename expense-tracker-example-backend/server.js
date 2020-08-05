const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const app = express();
const port = 3000
require('./config/mongo');

dotenv.config({path: './config/config.env'})

app.use(express.json())
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const transactions = require('./routes/transactions');
app.use('/api/v1/transactions',transactions);


const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))