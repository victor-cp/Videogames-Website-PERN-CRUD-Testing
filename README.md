# Individual Project

## About

A full stack CRUD project is carried out using the PERN tech, video game themed, consuming the RAWG api.

Testing all components frontend, backend and DB
(65 tests).

---

## Flowchart

### Design
![Captura de pantalla (12)](https://user-images.githubusercontent.com/69781012/216368963-39ff00b1-8b49-41da-88ae-1cdef7700a82.png)

### Architecture
![Captura de pantalla (14)](https://user-images.githubusercontent.com/69781012/216398600-3df59a63-77c4-4bb1-bfa6-7cc8a77f121c.png)
![Captura de pantalla (15)](https://user-images.githubusercontent.com/69781012/216398755-21c4ddd4-9d42-4177-a968-b12a46d45227.png)
![Captura de pantalla (13)](https://user-images.githubusercontent.com/69781012/216398617-db30c1bf-e355-4bc8-bf89-bdcfb096dd2f.png)

---

## Deploy

![Sin-títul-3o](https://user-images.githubusercontent.com/69781012/215948258-60ff165c-b3e9-4c93-b481-c720140779ee.gif)

---

## Important

It is necessary to have at least the latest stable version of Node and NPM.

Currently the required versions are::

- **Node**: 12.18.3 or higher
- **NPM**: 6.14.16 or higher

Dependency versions:

- **react**: 17.0.1
- **react-dom**: 17.0.1
- **react-router-dom**: 5.2.0
- **redux**: 4.0.5
- **react-redux**: 7.2.3
- **axios**: 1.2.2

---

## Before

In `api` create a file called: `.env` that has the following form:

```env
DB_USER=postgresUser
DB_PASSWORD=postgresPassword
DB_HOST=localhost
API_KEY=apiRawg
```

Replace `postgresUser` and `postgresPassword` with your own credentials.

Additionally, it will be necessary to create from psql a database called `videogames`

## Sentence

The general idea is to create an application in which you can see the different videogames available along with relevant information about them using the external api [rawg](https://rawg.io/apidocs) and from it to be able to make a CRUD.

**IMPORTANT**: Is necessary to create an account to get a Key.

### Endpoints

- GET <https://api.rawg.io/api/games>
- GET <https://api.rawg.io/api/games?search={game}>
- GET <https://api.rawg.io/api/genres>
- GET <https://api.rawg.io/api/games/{id}>

#### Necessary technologies

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres
- [ ] Jest - Mocha

---

## FRONTEND

### **Estructure**

Inside the `src`:

- **components** :

  - Card
  - LandingPage
  - Loading
  - LoadingSpiderman
  - NavBar
  - NotFound
  - Pagination
  - VideogameDetail
  - Videogames

- **containers** :

  - CreateVideogame
  - Filter
  - HomePage
  - Modal
  - Search

- **redux** :

  - actions
  - constants
  - reducers
  - [ ] store.js

- **static** :
  - image
  - imagens

## DATABASE

Inside the `src`:

- **models** :

  - Videogame => (*ID, *Name, Description, Release_date, \*Rating, Platforms)
  - Gnere => (ID, Name)

- **routes** :
  - genreRouter => GET /genres
  - index
  - videogameRouter => GET-POST-PUT-DELETE /videogame
  - videogamesRouter => GET /videogames

The relation is Many to Many, the intermediate table is called: videogame_genre.

## BACKEND

A server was developed in Node/Express with the following routes:

- [ ] **GET /genres**:
  - Get all types of video game genres possible
  - In the first instance they must bring them from rawg and save them in their own database and then use them from there
- [ ] **GET /videogames**:
  - Get a list of video games
  - It should return only the data necessary for the main route
- [ ] **GET /videogames?name="..."**:
  - Obtain a list of the first 15 videogames that contain the word entered as query parameter
  - If there is no video game, display an appropriate message
- [ ] **GET /videogame/{idVideogame}**:
  - Get the details of a particular video game
  - You must bring only the data requested in the video game detail route
  - Include associated genres
- [ ] **POST /videogames**:
  - Receives the data collected from the controlled form of the video game creation route by body
  - Create a videogame in the database, related to its genres.

ADITIONAL

- [ ] **PUT /videogame/{idVideogame}**:
  - Update a videogame from the database
- [ ] **DELETE /videogame/{idVideogame}**:
  - Delete a videogame from the database

---

## Testing

### Frontend:

Testing of a redux variables, reducer and actions; forms, buttons, links (router).
Test client-server connection

- [ ] ActionTypes
- [ ] CreateVideogame
- [ ] NavBar
- [ ] Pagination
- [ ] ReducerActions

### Backend - Routes:

Testing of a route GET for genres and videogames.
Test backend-database CRUD

- [ ] /genres
- [ ] /videogame
- [ ] /videogames

### DB - Models:

Test of models

- [ ] Genre
- [ ] Videogame
