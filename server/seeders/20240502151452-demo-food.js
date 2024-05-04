"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "food",
      [
        {
          id: 1,
          food_name: "Burger",
          food_image: "public/burger.png",
          price: 20000,
        },
        {
          id: 2,
          food_name: "Cola",
          food_image: "public/cola.png",
          price: 10000,
        },
        {
          id: 3,
          food_name: "Fanta",
          food_image: "public/fanta.png",
          price: 10000,
        },
        {
          id: 4,
          food_name: "Fried Chicken",
          food_image: "public/friedchicken.png",
          price: 25000,
        },
        {
          id: 5,
          food_name: "Fruit Tea",
          food_image: "public/fruittea.png",
          price: 12000,
        },
        {
          id: 6,
          food_name: "Ice Cream",
          food_image: "public/icecream.png",
          price: 8000,
        },
        {
          id: 7,
          food_name: "Mineral Water",
          food_image: "public/mineralwater.png",
          price: 5000,
        },
        {
          id: 8,
          food_name: "Nuggets",
          food_image: "public/nuggets.png",
          price: 15000,
        },
        {
          id: 9,
          food_name: "Sprite",
          food_image: "public/sprite.png",
          price: 10000,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("food", null, {});
  },
};
