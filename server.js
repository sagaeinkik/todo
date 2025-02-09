'use strict';

const fastify = require('fastify')({ logger: false });
const mongoose = require('mongoose');
const cors = require('@fastify/cors');
require('dotenv').config();

//Connect-variabler
/* const dbUrl = process.env.DB_URL; */
let dbUrl = process.env.DB_URL;
const port = process.env.PORT || 3000;

//MW
fastify.register(cors);

//Routes

//Välkomstroute
fastify.get('/', async (request, reply) => {
    return {
        meddelande:
            'Hej! Detta är ett API gjort av Saga Einarsdotter Kikajon för kursen Fullstacksutveckling med Ramverk, Mittuniversitetet 2025. Det är gjort med Fastify.',
    };
});

fastify.register(require('./routes/todo.routes'));

//DB-anslutning
function dbConnect() {
    mongoose
        .connect(dbUrl)
        .then(() => {
            console.log('Ansluten till MongoDB!');
        })
        .catch((error) => {
            console.log('Fel vid anslutning av databas: ' + error);
        });
}

//Starta app
const start = async () => {
    try {
        dbConnect();
        fastify.listen({ port: port, host: '0.0.0.0' });
        console.log(`Servern är igång på port ${port}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
