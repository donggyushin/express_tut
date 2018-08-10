var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer"); // v1.0.5
var upload = multer(); // multipart/form-data 형식을 파싱할때 사용.
var fs = require("fs");

//middleware part
app.use("/static", express.static(__dirname + "/public"));
app.use(bodyParser.json()); //application/json 형식을 파싱하기 위해서 사용
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/topic/new", (req, res) => {
  res.render("index");
});

app.get("/topic", (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log(err);
      res.status(400).send("fail to read files");
    }
    res.render("topic", { files: files, title: "", desc: "" });
  });
});

app.get("/topic/:topic", (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log(err);
      res.status(400).send("fail to read files");
    }
    fs.readFile("data/" + req.params.topic, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("fail to read data");
      }
      res.render("topic", {
        files: files,
        title: req.params.topic,
        desc: data
      });
    });
  });
});

app.post("/topic", upload.array(), (req, res, next) => {
  var title = req.body.title;
  var desc = req.body.description;

  fs.writeFile("data/" + title + ".txt", desc, err => {
    if (err) {
      res
        .status(400)
        .send("fail to save data, maybe you should change your title");
    }
    res.redirect("/topic");
  });
});

app.listen(8081, () => {
  console.log("file app listening on port 8081");
});
