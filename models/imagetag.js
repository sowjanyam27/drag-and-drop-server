"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class imagetag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      imagetag.belongsTo(models.image);
      imagetag.belongsTo(models.tag);
    }
  }
  imagetag.init(
    {
      imageId: DataTypes.NUMBER,
      tagId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "imagetag",
    }
  );
  return imagetag;
};
