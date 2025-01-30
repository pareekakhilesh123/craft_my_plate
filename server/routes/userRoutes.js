const express = require('express');
const router = express.Router();

const users = require('../db/user.json');

router.post('/login', (req, res) => {

    const { email, password } = req.body
   
   const foundUser = users.find(user => {
       return user.email === email
    })
  
    if(foundUser) {
       if(foundUser.password === password) {
        res.status(200).json({
            status: "success",
            token: "",
            name: foundUser.name
        });
       }
    }
   
    res.status(401).json({
        status: "user not found"
    });
  });

  router.post('/register', (req, res) => {

    const { email, password, name } = req.body

    const foundUser = users.find(user => {
        return user.email === email
     })

     if(!foundUser) {
        users.push({
            email,
            password,
            name
           })
           
            res.status(201).json({
                status: "New user added"
            });
     }
     res.status(400).json({
        status: "User allreday registered"
    });

  });
  
  module.exports = router;