require("dotenv").config();
const express = require("express");
const wourkouts = require("./router/workout");
const mongoose = require("mongoose");
const cors = require("cors");

//express app
const app = express();

// middleware;
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", wourkouts);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db and listen in port ${process.env.PORT} `);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//listen for requests
