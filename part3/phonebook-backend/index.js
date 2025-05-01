// Improts
require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
const Person = require('./models/person')

// Custom Morgan Token
const morgan = require('morgan')
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})

// APIs

// get all persons (optional: by name)
app.get('/api/persons', (request, response) => {
  let name = request.query.name
  if (name) {
    Person.find({ name })
      .then((p) => {
        response.json(p)
      })
  } else {
    Person.find({}).then((p) => {
      response.json(p)
    })
  }
})

// get info number of persons
app.get('/info', (request, response) => {
  Person.countDocuments().then((count) => {
    response.send(
      `<p>Phonebook has info for ${count} people </p>
            <p>${Date()}</p>`
    )
  })
})

// get person by id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((p) => {
      if (p) {
        response.json(p)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      next(error)
    })
})

// update person by id
app.put('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndUpdate(request.params.id, request.body, { runValidators: true })
    .then(
      (p) => {
        if (p) {
          response.json(p)
        } else {
          response.status(404).end()
        }
      }
    ).catch(error => {
      console.log(error)
      next(error)
    })
})

// delete by id
app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// create new person
app.post('/api/persons', (request, response, next) => {
  const name = request.body.name
  const number = request.body.number

  const person = new Person({ name, number })
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// Port config
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Error Handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malforamtted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
