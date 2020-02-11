// implement your API here
const express = require('express'); //import express

const server = express() //declare server

const Users = require('.data/db.js')

server.use(express.jsaon());

//initial get
server.get('/', (req, res) => {
    res.jason({server: "running"})
})

//get users
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({ errorMessage: "The user info could not be retrieved"})
        })
})
//





const port = 5000; //declare our port

server.listen(port, () => console.log(`/n API listening on port ${port} \n`)); //tell server to listen on our port