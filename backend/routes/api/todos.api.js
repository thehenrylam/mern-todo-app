const express = require("express");
const router = express.Router();
const keys = require("../../config/keys.secret");

const Todo = require('../../models/todo.model');

// @route GET todos/
// @desc Get the list of todos
// @access Public 
router.get('/', (req, res) => {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// @route GET todos/:id
// @desc Query a todo based on the id
// @access Public
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if (err) {
            console.log(err);
        } else {
            res.json(todo);
        }
    });
});

// @route POST todos/add
// @desc Add a todo item into the server's database
// @access Public
router.post('/add', (req, res) => {
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

// @route POST todos/update/:id
// @desc Update a todo item that is already in the server's database
// @access Public
router.post('/update/:id', (req, res) => {
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

// @route POST todos/remove/:id
// @desc Remove a todo item from the server's database by id
// @access Public
router.post('/remove/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, function(err, todo) {
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

module.exports = router;
