const express = require("express");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const path = require("path");
const fs = require("fs");

const categoryRouter = require("./routers/category");
const tagRouter = require("./routers/tags");
const imageRouter = require("./routers/image");

var bodyParser = require("body-parser");

const app = express();

//app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "public")));

const jsonParser = express.json();
app.use(corsMiddleWare());
app.use(jsonParser);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// GET endpoint for testing purposes, can be removed
app.get("/", async (req, res) => {
  res.send("Hi from express");
});

app.use("/category", categoryRouter);
app.use("/tags", tagRouter);
app.use("/image", imageRouter);

app.listen(PORT, () => console.log("server started on ", PORT));
