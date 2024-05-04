const db = require("./../models");

module.exports = {
  getAllproduct: async (req, res, next) => {
    try {
      const getData = await db.food.findAll();
      console.log(getData);
      res.send({
        data: getData,
      });
    } catch (error) {
      next(error);
    }
  },
};
