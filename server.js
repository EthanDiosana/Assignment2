const express = require('express');
const app = express();
const fs = require("fs");
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true
})
const port = 8080;

const createDBandTables = `CREATE DATABASE IF NOT EXISTS posts;
  use posts;
  CREATE TABLE IF NOT EXISTS post (
    username varchar(20),
    title varchar(20),
    rating int,
    body mediumtext,
    postDate DATE,
    ID int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (ID));`;

connection.connect();
connection.query(createDBandTables, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(results);
});

const firstPost = `INSERT INTO post (username, title, rating, body, postDate) VALUES ('Chad Green', 'Same Ballot', 3, 'We are in big trouble.', 2012-01-01)`;
connection.query(firstPost, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('1 row inserted');
  console.log(results);
})

connection.query(`SELECT * FROM post`, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('And now the result of the SELECT query');
  console.log(results);
})

connection.end();

app.get('/', (req, res) => {

  fs.readFile('/index.html', (err, pgres) => {
    if (err) {
      res.writeHead(404);
      res.write('Failed to locate resource.');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(pgres);
    }
    res.end();
  });
});

app.get('/get-posts', (req, res) => {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'posts'
  });
  connection.connect();
  connection.query('SELECT * FROM post', function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('Rows returned are: ', results);
    res.send({ status: 'success', rows: results });
  })
  connection.end();
})

app.listen(port, () => {
  console.log('Server started on port ' + port);
})