const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const fs = require("fs");

//上傳檔案路徑
const uploadConfig = multer({
  dest: "./upload",
});

//使用傳統方式實現檔案上傳
app.post("/api/upload", uploadConfig.any(), (req, res) => {
  console.log(req.files);
  for (let i = 0; i < req.files.length; i++) {
    let file = req.files[i];
    fs.renameSync(file.path, "./upload/" + file.originalname);
  }
  res.write("<h1>yes</h1>");
  res.end();
});

app.use(express.json());
app.use(express.urlencoded({ extends: false })); //這樣才抓得到 formData
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
