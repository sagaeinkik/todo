'use strict';

const errorHandler = require('../utils/errMsg');
const Todo = require('../models/todoModel');

//Nytt error-objekt
let err = errorHandler.createError();

//Hämta alla todos
module.exports.getAllTodos = async (request, reply) => {
    //Nollställ errors
    errorHandler.resetErrors(err);
    try {
        const result = await Todo.find({});

        //Inga todos
        if (!result || result.length === 0) {
            err = errorHandler.createError('Not found', 404, 'Inga todos hittades');
            return reply.code(err.https_response.code).send(err);
        }

        //Annars returnera listan
        return reply.send(result);
    } catch (error) {
        console.error(error);
        return reply.code(500).send(error);
    }
};

//Hämta enskild todo
module.exports.getOneTodo = async (request, reply) => {
    errorHandler.resetErrors(err);

    //ID
    const id = request.params.id;

    try {
        //Hitta enskild todo
        const result = await Todo.findById(id);

        //Ingen hittades
        if (!result) {
            err = errorHandler.createError('Not found', 404, 'Todo hittades ej');
            return reply.code(err.https_response.code).send(err);
        }

        //Returnera
        return reply.send(result);
    } catch (error) {
        if (error.message.includes('Cast to ObjectId failed')) {
            err = errorHandler.createError('Not found', 404, 'ID hittades ej');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.code(500).send(error);
    }
};

//Skapa ny todo
module.exports.createTodo = async (request, reply) => {
    errorHandler.resetErrors(err);

    //Validera
    const { title, description, status } = request.body;

    //Valideringsarray
    const validation = [
        errorHandler.checkEmpty(title, 'Titel'),
        errorHandler.checkEmpty(description, 'Beskrivning'),
        errorHandler.checkEmpty(status, 'Status'),
    ];

    //Om array innehåller error
    const error = errorHandler.validateFields(reply, validation);
    if (error) {
        return error;
    }

    //Spara
    try {
        //skapa ny todo

        const newTodo = new Todo({
            title: title,
            description: description,
            status: status,
        });

        const result = await newTodo.save();
        return reply.code(201).send({ message: 'Todo tillagd!', newTodo: result });
    } catch (error) {
        //Om det är validation error
        if (error.message.includes('Todo validation failed: status:')) {
            err = errorHandler.createError(
                'Bad request',
                400,
                'Status måste vara Ej påbörjad, Pågående eller Avklarad'
            );
            return reply.code(err.https_response.code).send(err);
        }
        return reply.code(500).send(error);
    }
};

//Uppdatera
module.exports.updateTodo = async (request, reply) => {
    //ID
    const id = request.params.id;

    try {
        //Uppdaterad todo
        const updatedTodo = await Todo.findByIdAndUpdate(id, request.body);

        //Felmeddelande
        if (!updatedTodo) {
            err = errorHandler.createError('Not found', 404, 'Todo hittades ej');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.send({ message: 'Todo uppdaterad!', updatedTodo });
    } catch (error) {
        if (error.message.includes('Cast to ObjectId failed')) {
            err = errorHandler.createError('Not found', 404, 'ID hittades ej');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.code(500).send(error);
    }
};

//Radera
module.exports.deleteTodo = async (request, reply) => {
    //ID
    const id = request.params.id;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        //Felmeddelande
        if (!deletedTodo) {
            err = errorHandler.createError('Not found', 404, 'Todo hittades ej');
            return reply.code(err.https_response.code).send(err);
        }

        return reply.send({ message: 'Todo raderad', deletedTodo });
    } catch (error) {
        return reply.code(500).send(error);
    }
};
