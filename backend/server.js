const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passportJwt = require("./config/passport");
const mongoose = require('mongoose');
const passport = require("passport");

const keys = require('./config/keys.secret');

const users = require("./routes/api/users.api");
const todos = require("./routes/api/todos.api");

const PORT = 4000;

app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

mongoose.connect(
        keys.mongoURI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Database successfully connected"))
    .catch(err => console.log(err));
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

// Passport middleware
app.use(passport.initialize());

// Passport config
passportJwt(passport);

// Set up routes for todos
// app.use('/todos', todoRoutes);
app.use('/todos', todos);
// Set up routes for users
app.use('/users', users);

app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}`);
});

