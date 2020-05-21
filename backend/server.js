const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

// The full route of todoRoutes is {/todos/<todoRoutes' path>}
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            // HTTP status 200 means "OKAY" (request succeeded)
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            // HTTP status 400 means "BAD REQUEST" errors
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo) {
            // HTTP status 404 means "NOT FOUND" error
            res.status(404).send('data is not found');
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                // HTTP status 400 means "BAD REQUEST" errors
                res.status(400).send("Update not possible");
            });
        }
    });
});

todoRoutes.route('/remove/:id').post(function (req, res) {
    Todo.findByIdAndRemove(req.params.id, function(err, todo) {
        res.redirect('/');
        if (todo) {
            // If todo is NOT null, that means that the todo object is removed.
            res.status(200).send('removal successful');
        } else if (err) {
            // If err is NOT null, that means that something has gone wrong, so report it.
            res.status(err.status).send(err);
        } else {
            // If NEITHER todo nor err is valid, then we assume that the todo object is not found.
            res.status(404).send('todo not found');
        }
    });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}`);
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

