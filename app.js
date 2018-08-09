var express = require("express");
var app = express();

app.set("views", "./views");
app.set("view engine", "pug");
app.use("/static", express.static(__dirname + "/public"));

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

app.listen(8081, () => {
  console.log("Server running at http://127.0.0.1:8081/");
});
