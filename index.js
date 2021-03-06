require("dotenv").config();
const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const leaderboardRoutes = require("./routes/leaderboard");

//db connection
require("./setup/db")();

//setup middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setup routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/leaderboard", leaderboardRoutes);

//invalid path
app.use((req, res, next) => {
  res.status(404);
  res.send({ error: "not found" });
});

let port = process.env.PORT || 3000;
console.log(`Listening to port: ${port}`);
app.listen(port);
