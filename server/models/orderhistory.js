"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ customer, orderHistoryDetail }) {
      this.belongsTo(customer, { foreignKey: "customer_id" });
      this.hasMany(orderHistoryDetail, { foreignKey: "orderHistoryDetail_id" });
    }
  }
  orderHistory.init(
    {
      customer_name: DataTypes.STRING,
      total_price: DataTypes.INTEGER,
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
      modelName: "orderHistory",
    }
  );
  return orderHistory;
};
