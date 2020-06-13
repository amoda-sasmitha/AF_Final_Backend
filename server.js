const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const multer = require("multer");

//define server running port
let port = 4000;

const MongoClient = require("mongodb").MongoClient;


//import routes

const eventsRoutes = require("./app/routes/events.routes");
const usersRoutes = require("./app/routes/users.routes");

// import db
const dbConfig = require("./config/db.config");

//open apps services

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
mongoose.set("useCreateIndex", true);

//defines routes


app.use("/users", usersRoutes);
app.use("/events", eventsRoutes);

//Handlle Error

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// critical functions
// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database now");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// open server
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
