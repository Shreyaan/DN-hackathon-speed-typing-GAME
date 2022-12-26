const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Score = createDB.define("scores", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userName: DataTypes.STRING,
  wpm: DataTypes.DECIMAL(10, 2),
  accuracy: DataTypes.DECIMAL(10, 2),
  value: DataTypes.DECIMAL(10, 2),
});

module.exports = Score;
