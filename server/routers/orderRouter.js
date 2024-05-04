const express = require("express");
const Router = express.Router();

const { orderController } = require("./../controllers");
Router.post("/addOrder", orderController.addTransaction);
Router.post("/plusOrder", orderController.addOrder);
Router.post("/subsOrder", orderController.subsTransaction);
Router.get("/getAllOrder", orderController.getAllOrder);
Router.post("/confirm", orderController.confirmOrder);
Router.get("/cancleOrder", orderController.cancleOrder);

module.exports = Router;
