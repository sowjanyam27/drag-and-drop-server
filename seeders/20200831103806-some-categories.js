"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Nature",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Wildlife",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Aerial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fashion",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
