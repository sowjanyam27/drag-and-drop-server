const { Router } = require("express");
const router = new Router();
const { upload } = require("../utils");
const vision = require("@google-cloud/vision");
const Image = require("../models").image;

//Google Cloud Vision API
const client = new vision.ImageAnnotatorClient({
  keyFilename: "./APIKey.json",
});

//Get all the Category
router.post("/image", upload.single("image"), async (req, res, next) => {
  const { file } = req;
  console.log("----file", file);
  try {
    // const labels = await analyseImage(file.path);
    // console.log("-----labels:", labels);
    const output = await client.labelDetection(file.path);
    const labels = output[0].labelAnnotations.map((label) => label.description);
    const newImage = await Image.create({
      url: file.path,
    });
    res.send({ labels: labels, imageId: newImage.dataValues.id });
  } catch (e) {
    res.status(400).send({ message: "Sorry! Something went wrong" });
    next(e);
  }
});
module.exports = router;
