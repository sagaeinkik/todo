'use strict';

const todoController = require('../../controllers/todo.controller');

//Alla todos
module.exports.getAllTodosOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        status: { type: 'string' },
                    },
                },
            },
        },
    },
    handler: todoController.getAllTodos,
};

//Enskild todo
module.exports.getOneTodoOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'string' },
                },
            },
        },
    },
    handler: todoController.getOneTodo,
};

//Uppdatera todo

module.exports.createTodoOpts = {
    schema: {
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    newTodo: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            status: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
    handler: todoController.createTodo,
};

//Uppdatera
module.exports.updateTodoOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    updatedTodo: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            status: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
    handler: todoController.updateTodo,
};

//Radera todo
module.exports.deleteTodoOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    deletedTodo: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            status: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
    handler: todoController.deleteTodo,
};
