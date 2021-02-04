const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const articles = require('./routes/articles');
const pages = require('./routes/pages');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config 
const db = require('./config/keys').mongoURI;

// Connect to Mongo

mongoose
    .connect(db)
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log("ERROR: ", err))

// Use Routes
app.use('/users', users);
app.use('/articles', articles);
app.use('/pages', pages);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
