const express = require("express");
const app = express();
const path = require("path");
const CORS = require("cors");
const config = require("./config/config");

const memberRouter = require("./routes/member");
const mongoose = require("mongoose");

app.use(CORS()).use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//mongodb
//more info read deprecation warnings
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB db connection established successfully.");
});
app.use("/", memberRouter);

const server = app.listen(config.port, () =>
  console.log(`Listening on ${config.port}`),
);

//
module.exports = server;
