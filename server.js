// const http = require('http');
const express = require('express')

const port = 5000;

const server = express()
server.use(express.json())

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", 'text/plain');
//     res.end('Hello World, from NodeJs');
// })

// this function is a request handler and middleware
server.get('/', (req, res) => {
    res.send('Hello world from express')
})

server.get('/hobbits', (req, res) => {
    // query string parameters get added to req.query
    const sortField = req.query.sortby || 'id'
    const hobbits = [
        {
            id: 3,
            name: 'Samwise Gamgee'
        },
        {
            id: 1,
            name: 'Frodo Baggins'
        },
        {
            id: 2,
            name: 'Leeroy Jenkens'
        }
    ]

    // apply the sorting
    const response = hobbits.sort(
        (a, b) => a[sortField] < b[sortField] ? -1 : 1
    )
    res.status(200).json(response)
})

server.post('/hobbits', (req, res) => {
    res.status(201).json({ url: '/hobbits', operation: 'POST' })
})

server.put('/hobbits', (req, res) => {
    res.status(200).json({ url: '/hobbits', operation: 'PUT' })
})

server.delete('/hobbits:id', (req, res) => {
    const id = req.params.id
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