const { Sequelize } = require("sequelize");

//* Instantiates sequelize with the name of database, username, password and configuration options
const createDB = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
  logging: false,
});

//* Connects the ExpressJS app to DB
const connectToDB = () => {
  createDB
    .sync()
    .then((res) => {
      console.log("Successfully connected to database");
    })
    .catch((err) => console.log("Cannot connect to database due to:", err));
};

module.exports = { createDB, connectToDB };

const scoreModel = require("../models/scoreModel");
const userModel = require("../models/userModel");

// Associates the user with the score
userModel.hasMany(scoreModel, {
  as: "scores",
});
scoreModel.belongsTo(userModel);
// scoreModel.sync({ force: true }).then(() => {
//   // Table created
//   console.log('Task table created');
// });

// scoreModel.belongsTo(userModel, { foreignKey: "userID" });
// userModel.hasMany(scoreModel, { foreignKey: "id" });
