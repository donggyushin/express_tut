var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "donggyu2",
  password: "nlcfjb",
  database: "mysql_tut"
});

conn.connect();
var sql = "select * from topic";
conn.query(sql, (err, results, fields) => {
  if (err) console.log(err);
  console.log(results);
  console.log(fields);
});

conn.end();
