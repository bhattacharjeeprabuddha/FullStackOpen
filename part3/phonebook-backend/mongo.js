const mongoose = require('mongoose');


// setup db connection
if(process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://bhattacharjeeprabuddha:${password}@cluster0-fullstackopen.cmj6t0m.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0-fullStackOpen`;
mongoose.set('strictQuery', false);
mongoose.connect(url);


// define schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

// register schema model
const Person = mongoose.model('person', personSchema);

// create and save person from command line
if(process.argv.length > 3){
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new Person({name: name, number: number});
    person.save().then(() => {
        console.log('person saved to database');
        mongoose.connection.close();
    });
    
}


// query all persons/people from cli
if(process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(p => {
            console.log(p);
        });
        mongoose.connection.close();
    });
}




