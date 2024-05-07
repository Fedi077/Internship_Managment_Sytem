const express =require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const stageRoute = require('./routes/stage');
const formRoute = require ('./routes/form');
const dashboardRoute = require('./routes/dashboard');
const app =express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/category',categoryRoute);
app.use('/stage',stageRoute);
app.use('/form',formRoute);
app.use('/dashboard',dashboardRoute);

module.exports = app;