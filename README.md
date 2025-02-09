# Fördjupad Frontend-utveckling moment 2.1

## Bakgrund

Vår uppgift är att skapa en att göra-lista i react med hjälp av ett egenskapat API i valfritt språk och mot valfri databas.

## Info

Detta enkla API är skapat med Fastify och MongoDB, med hjälp av Mongoose som ODM.

## Endpoints

| Metod   |  URL        |  Beskrivning                |
| ------- | ----------- | --------------------------- |
|  get    |  /          |  Välkomstmeddelande         |
|  get    |  /todos     | Samtliga uppgifter          |
|  get    |  /todos/:id |  Specifik uppgift           |
|  post   |  /todos     |  Lägg till en uppgift       |
|  put    |  /todos/:id |  Uppdatera specifik uppgift |
|  delete |  /todos/:id |  Radera specifik uppgift    |
