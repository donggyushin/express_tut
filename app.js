var express = require("express");
var app = express();

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

app.listen(8081, () => {
  console.log("Server running at http://127.0.0.1:8081/");
});
