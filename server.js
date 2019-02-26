// const http = require('http');
const express = require('express')

const port = 5000;

const server = express()
server.use(express.json())

let hobbits = [
    {
        id: 1,
        name: 'Samwise Gamgee',
        age: 111
    },
    {
        id: 2,
        name: 'Frodo Baggins',
        again: 33
    },
    {
        id: 3,
        name: 'Leeroy Jenkens',
        age: 38
    }
]

let nextId = 4

// this function is a request handler and middleware
server.get('/', (req, res) => {
    res.send('Hello world from express')
})

// data comes from clients can be read 3 ways. req.params, req.query, req.body
server.get('/hobbits', (req, res) => {
    // query string parameters get added to req.query
    const sortField = req.query.sortby || 'id' 

    // apply the sorting
    const response = hobbits.sort(
        (a, b) => a[sortField] < b[sortField] ? -1 : 1
    )
    res.status(200).json(response)
})

server.post('/hobbits', (req, res) => {
    console.log(req.body)
    const hobbit = req.body;
    hobbit.id = nextId++

    hobbits.push(hobbit)

    res.status(201).json(hobbits)
})

server.put('/hobbits/:id', (req, res) => {
    const hobbit = hobbits.find(hobbit => hobbit.id == req.params.id)

    if(!hobbit) {
        res.status(404).json({ message: 'Hobbit doesnt not exist'})
    } else {
        // modify the existing hobbit
        Object.assign(hobbit, req.body)
        res.status(200).json(hobbit)
    }
})

server.delete('/hobbits:id', (req, res) => {
    const id = req.params.id
    console.log(req.params)
    // or we can deconstruct it like so : const {id} = req.params;
    res.sendStatus(200).json({
        url: `hobbits/${id}`,
        operation: `DELETE for hobbit with id ${id}`
    })
})

server.listen(port, () => {
    console.log(`server listening on ${port}`)
})

// this request handler executes when making a GET request to /about
server.get('/about', (req, res) => {
    res.status(200).send('<h1>About Us</h1>');
  });
  
  // this request handler executes when making a GET request to /contact
  server.get('/contact', (req, res) => {
    res.status(200).send('<h1>Contact Form</h1>');
  });