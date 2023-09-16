const express = require("express");
const mongoDB = require("./db");
const app = express();
mongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (rep, res) => {
  res.send(global.products);
});
app.listen(4000, () => {
  console.log("listening at port 4000");
});
