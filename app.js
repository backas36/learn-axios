const express = require("express");
const app = express();
app.use(express.static("./public"));
app.get("/api/get", (req, res) => {
  console.log(req.query);
  res.json({ name: "Ashi" });
});

app.listen(5000);
