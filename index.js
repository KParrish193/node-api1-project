// implement your API here
const express = require('express'); //import express

const server = express() //declare server

const Users = require('./data/db.js')

server.use(express.json());

//initial get
server.get('/', (req, res) => {
    res.json({server: "running"})
})

//add (post) a user using info from req.body
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    req.body.name && req.body.bio
    ?
        Users.insert(userInfo)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({errorMessage:"There was an error adding the user"})
            })
    :
            res.status(400).json({ errorMessage: "Name and Bio needed"})
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

// get a user by id, use req.params
server.get('/api/users/:id', (req, res) => {
const id  = req.params.id

    Users.findById(id)
        .then(user => {
            user === undefined
            ?
                res.status(404).json({error: 'user not found by id'})
            :
                res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: "the user info could not be retrieved"})
        })
})

// delete user with specified id: req.params.id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    Users.remove(id)
        .then(removedUser => {
            removedUser === 0
            ?
                res.status(404).json({error: 'user not found by id' })
            :
                res.status(200).json(removedUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "user could not be removed"})
        })
})

// update (put) user: req.params.id && req.body
server.put ('/api/users/:id', (req, res) => {
    const id = req.params.id
    const userInfo = req.body

    Users.update(id, userInfo)
        .then(user => {
            console.log(user)
            if(user === 0){
                res.status(404).json({errorMessage: "user not found"})
            }

            if(!req.body.name || !req.body.bio) {
                res.status(400).json({ errorMessage: "Please include name & bio"})
            }
            if(user){
                res.status(200).json(user)
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({ errorMessage: "nope."})
        })
})

const port = 5000; //declare our port

server.listen(port, () => console.log(`/n API listening on port ${port} \n`)); //tell server to listen on our port