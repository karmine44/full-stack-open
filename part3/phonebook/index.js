const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('post-data', (req, res) => (
    JSON.stringify({ name: req.body.name, number: req.body.number })
))

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny', {
    skip: (req, res) => req.method === 'POST'
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data', {
    skip: (req, res) => req.method !== 'POST'
}))

app.get('/', (request, response) => {
    response.send('Hello, world!')
})

// Get all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// Get specific person
app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
            
        })
        .catch(error => next(error))
})


app.get('/info', (request, response, error) => {
    
    Person.estimatedDocumentCount()
        .then(count => {
            response.send(`Phonebook has info for ${count} ${count > 1 ? 'people' : 'person'}\n\n${new Date}`)
        })
        .catch(error => next(error))
})

// Add New Person
app.post('/api/persons', (request, response, next) => {
    const body = request.body

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

    Person.findOne({ name : body.name })
        .then(existing => {
            if(existing) {
                return response.status(400).json({
                    error: 'Name must be unique'
                })
            }

            const person = new Person({
                name: body.name,
                number: body.number,
            })

            person.save()
                .then(savedPerson => {
                    response.json(savedPerson)
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))

})

// Edit person's number
app.put('/api/persons/:id', (request, response, next) => {
    const { number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if(!person){
                return response.status(404).end()
            }

            person.number = number

            return(person.save().then(updatedPerson => {
                response.json(updatedPerson)
            }))
        })
        .catch(error => next(error))
})


// Delete person
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// Unknown Endpoint

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'Unknown Endpoint' })
}

app.use(unknownEndpoint)

// Error Handling

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name ==='CastError') {
        response.status(400).send({ error: 'Malformed ID' })
    } else if (error. name === 'ValidationError') {
        response.status(400).json( { error: error.message } )
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})