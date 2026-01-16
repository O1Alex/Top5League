const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Winner = sequelize.define(
  "Winner",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    month_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    reward_status: {
      type: DataTypes.ENUM("pending", "sent"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "winners",
    timestamps: true,
    updatedAt: false,
    createdAt: "created_at",
  }
);

module.exports = Winner;