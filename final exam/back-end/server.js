const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const app = express();

// utils
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({
    extended:true
}));

// db config
const uri = process.env.MONGO_URI;

// connect to mongo
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log(err));

const assignmentsRouter = require('./routes/assignment.route');
const answerRouter = require('./routes/answer.route');

// use routes
app.use('/assignments', assignmentsRouter);
app.use('/answers', answerRouter);

const port = process.env.PORT || 5000;

app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server is running on port ${port}`);
});
