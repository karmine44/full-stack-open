require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to', url)
mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const numberValidate = [
    v => {
        const dashCheck = v.slice(1, -1).split("-")
        const numberCheck = v.split("-")
        if(dashCheck.length === 2 && numberCheck.every(part => /^\d+$/.test(part)))
            return true
        
        return false
    },
    '{VALUE} is not a valid {PATH}'
]

const personSchema = new mongoose.Schema({
    name : {
        type: String,
        minLength: 3,
        required: true,
    },
    number : {
        type: String,
        minLength: 8,
        validate: numberValidate,
        required: true,
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)