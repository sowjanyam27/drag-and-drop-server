const express = require("express");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");

const categoryRouter = require("./routers/category");

const app = express();

const jsonParser = express.json();
app.use(corsMiddleWare());
app.use(jsonParser);

// GET endpoint for testing purposes, can be removed
app.get("/", async (req, res) => {
  res.send("Hi from express");
});

app.use("/category", categoryRouter);

app.listen(PORT, () => console.log("server started on ", PORT));
