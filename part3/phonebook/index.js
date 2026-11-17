const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('post-data', (req, res) => (
    JSON.stringify({ name: req.body.name, number: req.body.number })
))


const app = express()
app.use(cors())

app.use(express.json())
app.use(morgan('tiny', {
    skip: (req, res) => req.method === 'POST'
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data', {
    skip: (req, res) => req.method !== 'POST'
}))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const checkId = (id) => {
    return persons.find(person => person.id === id)
}

app.get('/', (request, response) => {
    response.send('Hello, world!')
})

// Get all persons
app.get('/api/persons', (request, response) => {
    response.send(persons)
})

// Get specific person
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id

    if (!checkId(id)) {
        return response.status(400).json({
            error: 'Person is not in phonebook'
        })
    }

    response.send(persons.find(person => person.id === id))
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people\n\n${new Date}`)
})

// Add New Person
app.post('/api/persons', (request, response) => {
    const body = request.body
    let id = 0;
    
    while(id === 0 || checkId(id))
        id = Math.floor(Math.random() * (1000))

    if(!body.name) {
        return response.status(400).json({
            error: 'Name is missing'
        })
    }

    if(!body.number) {
        return response.status(400).json({
            error: 'Number is missing'
        })
    }

    if(persons.find(person => person.name === body.name)){
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    person = {
        "id": id.toString(),
        "name": body.name,
        "number": body.number 
    }

    persons = persons.concat(person) 

    response.send(person)
})


// Delete person
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    if (!checkId(id)) {
        return response.status(400).json({
            error: 'Person is not in phonebook'
        })
    }

    persons = persons.filter(person => person.id !== id)

    response.send(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})