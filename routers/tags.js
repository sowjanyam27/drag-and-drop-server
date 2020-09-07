require("dotenv").config();
const { Router } = require("express");
const router = new Router();
const { upload } = require("../utils");
const vision = require("@google-cloud/vision");
const Image = require("../models").image;

//Google Cloud Vision API
/* const client = new vision.ImageAnnotatorClient({
  keyFilename: "./APIKey.json",
}); */

const client = new vision.ImageAnnotatorClient({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
});

//Get all the Category
router.post("/image", upload.single("image"), async (req, res, next) => {
  const { file } = req;
  try {
    // const labels = await analyseImage(file.path);
    // console.log("-----labels:", labels);
    console.log("client:", client);
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
