const express = require('express');
const mongoClient = require('mongoose');
const routes = require('./routes');


const app = express();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/ToDoApp';

// const errorMessage = {
//     message : "Error into Database"
// }

mongoClient.connect(MONGO_URL); 

app.use(express.json());
app.use(routes);


const PORT = process.env.PORT || 4000;
app.listen(PORT);