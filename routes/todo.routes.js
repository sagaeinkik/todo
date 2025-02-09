'use strict';

const {
    getAllTodosOpts,
    getOneTodoOpts,
    createTodoOpts,
    updateTodoOpts,
    deleteTodoOpts,
} = require('./options/todo.options');

async function todoRoutes(fastify) {
    fastify.get('/todos', getAllTodosOpts);
    fastify.get('/todos/:id', getOneTodoOpts);
    fastify.post('/todos', createTodoOpts);
    fastify.put('/todos/:id', updateTodoOpts);
    fastify.delete('/todos/:id', deleteTodoOpts);
}

module.exports = todoRoutes;
