const express = require("express");
const db = require("./models");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());
// app.use("/image", express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));
const { foodRouter, orderRouter } = require("./routers");

app.use("/food", foodRouter);
app.use("/transaction", orderRouter);
app.get("/", (req, res) => {
  res.status(201).send("Welcome to The Menu");
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const statusMessage = err.message || "Error!";

  return res.status(statusCode).send({
    isError: true,
    message: statusMessage,
    data: null,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({
    //   alter: true,
    // });
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
