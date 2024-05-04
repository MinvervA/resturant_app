"use strict";
const { Model } = require("sequelize");
const orderhistory = require("./orderhistory");
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ order, orderHistory }) {
      this.hasMany(order, { foreignKey: "customer_id" });
      this.hasMany(orderHistory, { foreignKey: "customer_id" });
    }
  }
  customer.init(
    {
      customer_name: DataTypes.STRING,
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
      modelName: "customer",
    }
  );
  return customer;
};
