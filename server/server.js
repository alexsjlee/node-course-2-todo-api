const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    // Checking to see if the id is valid
    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    };

    Todo.findById(id).then((todo) => {
        // Sending a 404 if unable to fetch todo with id
        if(!todo) {
            res.status(404).send();
        };
        // Happy route
        // Sending the todo, todo: todo, as an object so we can future proof it, enabling us to add to it as we see fit
        res.status(200).send({todo});
    }).catch((e) => {
        // e left out intentionally
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};