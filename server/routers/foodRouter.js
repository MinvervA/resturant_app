const express = require("express");
const Router = express.Router();

const { productController } = require("./../controllers");

Router.get("/getAll", productController.getAllproduct);

module.exports = Router;
