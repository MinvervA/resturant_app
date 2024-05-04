const { includes } = require("lodash");
const db = require("./../models");
const Sequelize = require("sequelize");
const { message } = require("statuses");

module.exports = {
  addTransaction: async (req, res, next) => {
    try {
      const { id } = req.body;
      console.log(id);

      const checkTrans = await db.order.findOne({
        where: {
          food_id: id,
        },
      });
      if (!checkTrans) {
        const addTrans = await db.order.create({
          food_id: id,
          qty: 1,
        });
        if (addTrans) {
          res.status(200).send({
            message: "Add to order Success!",
          });
        }
      } else {
        const updateTrans = await db.order.update(
          { qty: Sequelize.literal("qty + 1") },
          {
            where: {
              food_id: id,
            },
          }
        );
        if (updateTrans) {
          res.status(200).send({
            message: "Add to order Success!",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  },
  addOrder: async (req, res, next) => {
    try {
      const { id } = req.body;
      const checkTrans = await db.order.findOne({
        where: {
          food_id: id,
        },
      });

      const updateTrans = await db.order.update(
        { qty: checkTrans.dataValues.qty + 1 },
        {
          where: {
            food_id: id,
          },
        }
      );

      return res.status(200).send({
        message: "Add to order Success!",
      });
    } catch (error) {
      next(error);
    }
  },
  subsTransaction: async (req, res, next) => {
    try {
      const { id } = req.body;
      console.log(id);

      const checkTrans = await db.order.findOne({
        where: {
          food_id: id,
        },
      });
      console.log(checkTrans);
      if (!checkTrans)
        return res.status(200).send({
          message: "you have not order!",
        });

      if (checkTrans.dataValues.qty > 1) {
        const updateTrans = await db.order.update(
          { qty: checkTrans.dataValues.qty - 1 },
          {
            where: {
              food_id: id,
            },
          }
        );

        return res.status(200).send({
          message: "Success substract your order!",
        });
      } else if ((checkTrans.dataValues.qty = 1)) {
        const deleteTrans = await db.order.destroy({
          where: {
            food_id: id,
          },
        });

        return res.status(200).send({
          message: "Food is success to cancle!",
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getAllOrder: async (req, res, next) => {
    try {
      let total = 0;
      const getAllOrder = await db.order.findAll({
        include: [
          {
            model: db.food,
            attributes: ["food_name", "price", "food_image"],
          },
        ],
      });
      for (order of getAllOrder) {
        total += order.qty * order.food.price;
      }
      return res.status(200).send({
        data: getAllOrder,
        total: total,
      });
    } catch (error) {
      next(error);
    }
  },
  confirmOrder: async (req, res, next) => {
    try {
      const { customer_name } = req.body;
      let total_price = 0;
      console.log(customer_name);
      const newCust = await db.customer.create({
        customer_name: customer_name,
      });

      const getAllOrder = await db.order.findAll({
        include: [
          {
            model: db.food,
            attributes: ["price", "food_name"],
          },
        ],
      });

      for (order of getAllOrder) {
        const detail = {
          customer_name: newCust.dataValues.customer_name,
          qty: order.qty,
          food_name: order.food.food_name,
          subtotal: order.qty * order.food.price,
          price: order.food.price,
        };
        total_price += detail.subtotal;
        await db.orderHistoryDetail.create(detail);
      }

      const data = {
        customer_id: newCust.dataValues.id,
        customer_name: newCust.dataValues.customer_name,
        total_price: total_price,
      };

      const addNewTrans = await db.orderHistory.create(data);
      console.log(addNewTrans);
      const deleteCart = await db.order.destroy({
        where: {},
      });
      res.send({
        message: "Your Order Is on Process!",
      });
    } catch (error) {
      next(error);
    }
  },
  cancleOrder: async (req, res, next) => {
    try {
      const cancle = await db.order.destroy({ where: {} });
      res.send({
        message: "Berhasil Cancle Order!",
      });
    } catch (error) {
      next(error);
    }
  },
};
