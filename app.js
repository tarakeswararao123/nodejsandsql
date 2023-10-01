const mysql = require('mysql')
const express = require('express')
const app = express()
const cors = require('cors'); 
const db = require('./dbConnection')
const employees = require('./src/employee');
const student = require('./src/student');
const employee= require('./src/employees')
const morgan =require('morgan')

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json());

app.use('/employees',employees)
app.use('/student',student)
app.use('/employee', employee)
// app.use(customMiddleware);
// app.use(loggerMiddleware);

module.exports = app