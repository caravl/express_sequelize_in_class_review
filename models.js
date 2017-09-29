// DEFINE MODELS

const Sequelize = require('sequelize');

// make a postgres db
const db = new Sequelize('postgress://localhost:5432/catClub', {logging: false});
// in terminal
// createdb catClub

const Cat = db.define('cat', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ageMonths: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  breed: {
    type: Sequelize.ENUM('domestic short hair', 'Maine coon', 'bengal', 'sphinx'), // allow only these breeds
    defaultValue: 'domestic short hair'
  },
  hasShots: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, { // all getter methods, hooks, etc
  getterMethods: { // virtual property
    ageInYears: function () { // works on the instance (this) / a cat that's already in db
      return Math.round(this.ageMonths / 12);
    }
  },
  hooks: { // when you're going to change something, do this before going into db
    beforeCreate: function (cat) { // pass in the cat class, works on the instance passed to them
      // only trigger if hasShots is false
      if (!cat.hasShots) {
        cat.name = cat.name + 'Needs Shots!'
      }
    }
  }
})

module.exports = {db, Cat}; // object destructuring - replaces { db: db, Cat: Cat }

