const express = require("express");
//const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extends: false }));
app.use(express.static("./public"));
app.get("/api/get", (req, res) => {
  console.log(req.query);
  res.json({ name: "Ashi" });
});

app.post("/api/post", (req, res) => {
  console.log("/api/post =>", req.body);
  res.end();
});

app.listen(5000);
