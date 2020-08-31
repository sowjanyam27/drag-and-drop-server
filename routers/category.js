const { Router } = require("express");
const router = new Router();
const Category = require("../models").category;

//Get all the Category
router.get("/", async (request, response, next) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      response.status(404).send("categories not found");
    } else {
      response.send(categories);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
