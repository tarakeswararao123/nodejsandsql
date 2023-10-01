const express = require('express');
const app = express.Router();
const connect = require('../dbConnection'); // Import the connect object
app.use(express.json())
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { request } = require('../app');

const verifyAccessToken = (request, response, next) => {
    let jwtToken = null;
    const header = request.headers["authorization"];
    if (header !== undefined) {
      jwtToken = header.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid Access Token");
    } else {
      jwt.verify(jwtToken, "token", async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid Access Token");
        } else {
          next();
        }
      });
    }
  };

// register API
app.post("/register", async (req, res) => {
    // console.log(req.body);
    const { id, name, username, password, gender, location } = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);
    const checkUserQuery = "SELECT * FROM employees WHERE username = ?";
    const verifiedUser =  null;
    connect.query(checkUserQuery, [username], (err, result)=>{
        if(err){
            res.status(400)
        }else{
            console.log(result);
            if (result.length === 0) {
                const createUserQuery = "INSERT INTO employees ( id, name, username, password, gender, location) VALUES (?, ?, ?, ?, ?,?)";
                 connect.query(createUserQuery, [ id, name, username, hashedPassword, gender, location]);
                res.status(201).send("User created successfully");
              } else {
                res.status(400).send("The user name is already exists");
              }
        }
    });
    
  });
// login api
app.post("/login", async (req, res) =>{
    const {username, password} =req.body;
    const checkUserQuery = "SELECT * FROM employees WHERE username = ?";
    connect.query(checkUserQuery, [username],  async (err, result)=>{
        if(err){
            res.status(400)
        }else{
            if (result.length !== 0) {
                // res.send("login succesfull")
                const resultpassword = result[0].password
                const verifypassword = await bcrypt.compare(password, resultpassword);
                // console.log(verifypassword);
                if(verifypassword) {
                    const payload = {username: username}
                    const jwttoken = jwt.sign(payload, "token");
                    res.send({jwttoken});
                }
              } else {
                res.status(400).send("The user name is already exists");
              }
        }
    });
})
app.get('/getAllEmployees', verifyAccessToken, (req, res) => {
    const sqlQuery = 'SELECT * FROM employee';
  
    connect.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ error: 'Error fetching employees' });
        return;
      }
  
      res.status(200).json(results);
    });
  });
  module.exports = app;