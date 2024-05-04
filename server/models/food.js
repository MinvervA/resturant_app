"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    static associate({ order, orderHistoryDetail }) {
      this.hasMany(order, { foreignKey: "food_id" });
      this.hasMany(orderHistoryDetail, { foreignKey: "food_id" });
    }
  }
  food.init(
    {
      food_name: DataTypes.STRING,
      food_image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "food",
    }
  );
  return food;
};
