require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('dist'));
app.use(express.json());
const Person = require("./models/person");


const morgan = require('morgan');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



// custom morgan token
morgan.token('body', (request) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    }
});


app.get('/api/persons', (request, response) => {
    Person.find({}).then(p => {
        response.json(p);
    })
})

app.get('/info', (request, response) => {
    Person.countDocuments().then(count => {
        response.send(
            `<p>Phonebook has info for ${count} people </p>
            <p>${Date()}</p>`
        );
    });
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id===id)

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(p => p.id !== id);
    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const name = request.body.name;
    const number = request.body.number;

    if (!name) {
        return response.status(400).json({error: 'name is missing'})
    }

    if (!number) {
        return response.status(400).json({error: 'number is missing'})
    }
    
    const person = new Person({name, number});
    person.save().then(savedPerson => {
        response.json(savedPerson);
    });

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});


