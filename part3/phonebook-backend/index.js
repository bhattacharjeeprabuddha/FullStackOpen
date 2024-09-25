const express = require('express');
const app = express();
const morgan = require('morgan');

// middlewares 
app.use(express.json());
app.use(morgan('dev'));

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

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people </p>
        <p>${Date()}</p>`
    );
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
    const person = request.body;
    const name = person.name;
    const number = person.number;

    if (!name) {
        return response.status(400).json({error: 'name is missing'})
    }

    if (!number) {
        return response.status(400).json({error: 'number is missing'})
    }
    

    if (persons.map(p => p.name).includes(name)){
        return response.status(409).json({ error: 'name must be unique' });
    } 

    
        const id = Math.round(Math.random() * 1000);
        person.id = `${id}`;
        persons = persons.concat(person);
        response.status(200).json(person);
    

})








const PORT = 3001;
app.listen(PORT);
