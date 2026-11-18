const mongoose = require('mongoose')

// Format node [name of this file] [password] [name] [number]
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack-open:${password}@cluster0.timktba.mongodb.net/`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family : 4 })

const personSchema = new mongoose.Schema({
  name : String,
  number : String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person(
  {
    name: name,
    number: number,
  }
)

if (name === undefined || number === undefined) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

} else {
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

