const { Router } = require("express");
const router = new Router();
const Image = require("../models").image;
const ImageTag = require("../models").imagetag;
const Tag = require("../models").tag;
const { upload } = require("../utils");

//Get all the Category
router.post("/", async (request, response, next) => {
  const { title, description, place, category, tags, imageId } = request.body;
  try {
    const imageToUpdate = await Image.findByPk(imageId);
    if (!imageToUpdate) {
      res.status(404).send("Image not found");
    } else {
      const updatedImage = await imageToUpdate.update({
        title,
        description,
        location: place.address,
        categoryId: category,
      });

      const tagsCreatePromises = tags.map(async (tag) => {
        let isExistedTag = await Tag.findOne({ where: { name: tag } });
        if (isExistedTag === null) {
          isExistedTag = await Tag.create({ name: tag });
        }
        if (isExistedTag) {
          const imageTagCreate = await ImageTag.create({
            imageId,
            tagId: isExistedTag.dataValues.id,
          });
        }
      });

      await Promise.all(tagsCreatePromises);
      response.send(updatedImage);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
