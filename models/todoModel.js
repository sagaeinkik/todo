'use strict';

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Du måste ange titel'],
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: [true, 'Du måste ange status'],
        enum: ['Ej påbörjad', 'Pågående', 'Avklarad'],
    },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
