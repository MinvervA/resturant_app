"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderHistoryDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ orderHistory, food }) {
      this.belongsTo(orderHistory, { foreignKey: "orderHistoryDetail_id" });
      this.belongsTo(food, { foreignKey: "food_id" });
    }
  }
  orderHistoryDetail.init(
    {
      food_name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      subtotal: DataTypes.INTEGER,
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
      modelName: "orderHistoryDetail",
    }
  );
  return orderHistoryDetail;
};
