/* terminal setup:
mkdir folder
cd folder
git init
npm (to create json.package)
touch app.js
npm install --save express body-parser morgan sequelize
*/

// app.js set up

// get server up
'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path'); // built-in middleware that tells you where you are and to navigate to another path

// require cats.js and users.js
const catRoutes = require('./routes/cats');
const userRoutes = require('./routes/users');

// require the db
const db = require('/models').db;

// our app
const app = express();

module.exports = app; // allow other files to access

// make middleware

// set up bodyParser
app.use(bodyParser.urlencoded((extended: false))); // parses http request into something easier to access
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public'))); // joining directory you're in and looking for public directory (might not use in this example)
app.use(morgan('dev'));

// create cats.js and users.js route pages
// direct to the other routes
app.use('/cats', catRoutes);
app.use('/users', userRoutes);

// setting up the routes

// handle errors
app.use((err, req, res, next) => {
  console.log(err.stack); // gives you stack trace for that error
  res.status(err.status || 500).send(err.message);
})

// sync db and THEN start server
db.sync()
.then( () => {
  console.log('kitten database has synced');
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  })
});



// make folders: models, index.js

// in index.js
// check server - in package.json
  // "start": "nodemon app.js"
  // "test": "echo \ error: no test specified\" && exit 1"
// npm start
