var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer"); // v1.0.5
var upload = multer(); // multipart/form-data 형식을 파싱할때 사용.

app.use("/static", express.static(__dirname + "/public"));
app.use(bodyParser.json()); //application/json 형식을 파싱하기 위해서 사용
app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencoded 이 형식을
//파싱해주기 위해 사용. 저는 이방식은 전혀 사용하지 않습니다.

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/staticfile", (req, res) => {
  res.send('image: <img src="/express.png">');
});

app.get("/dynamic", (req, res) => {
  var lis = "";
  var now = Date();

  for (i = 0; i < 5; i++) {
    lis += "<li>for</li>";
  }

  var output = `<html>
    <head>
        <title>dynamic page</title>
    </head>
    <body>
        this is not index.html file
        <ul>${lis}</ul>
        ${now}
    </body>
</html>`;
  res.send(output);
});

app.get("/pug", (req, res) => {
  res.render("index", {
    title: "Hey",
    message: "Hello there!"
  });
});

app.get("/querystring", (req, res) => {
  const nav = [
    "React",
    "Javascript",
    "graphQL",
    "typescript",
    "Serverless",
    "node.js",
    "Express"
  ];
  let id = req.query.id;
  const output = `
  <!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>query string</title>
  </head>
  <body>
    <a href="/querystring?id=0">React</a>
    <a href="/querystring?id=1">Javascript</a>
    <a href="/querystring?id=2">graphQL</a>
    <a href="/querystring?id=3">typeScript</a>
    <a href="/querystring?id=4">ServerLess</a>
    <a href="/querystring?id=5">node.js</a>
    <a href="/querystring?id=6">Express</a>
    ${nav[id]}
  </body>
</html>
  `;
  res.send(output);
});

app.get("/params/:id", (req, res) => {
  const nav = [
    "React",
    "Javascript",
    "graphQL",
    "typescript",
    "Serverless",
    "node.js",
    "Express"
  ];

  const id = req.params.id;

  const output = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>query string</title>
  </head>
  <body>
    <a href="/params/0">React</a>
    <a href="/params/1">Javascript</a>
    <a href="/params/2">graphQL</a>
    <a href="/params/3">typeScript</a>
    <a href="/params/4">ServerLess</a>
    <a href="/params/5">node.js</a>
    <a href="/params/6">Express</a>
    ${nav[id]}
  </body>
</html>`;

  res.send(output);
});

app.get("/form", (req, res) => {
  const output = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <form class="simple" action="/form_receiver" method="post">
      <input type="text" name="title" placeholder="title">
      <textarea name="description" rows="8" cols="80"></textarea>
      <input type="submit" name="" value="submit">
    </form>
  </body>
</html>`;
  res.send(output);
});

app.post("/form_receiver", upload.array(), (req, res, next) => {
  console.log("title: " + req.body.title);
  console.log("description: " + req.body.description);
  res.json(req.body);
});

app.listen(8081, () => {
  console.log("Server running at http://127.0.0.1:8081/");
});
