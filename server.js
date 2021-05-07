const express = require('express');
const app = express();
const fs = require("fs");
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// CONNECT TO THE DATABASE
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  multipleStatements: true
});
db.connect();

// QUERY TO CREATE DATABASE AND TABLE IF THEY DO NOT ALREADY EXIST
const createDatabase = `CREATE DATABASE IF NOT EXISTS asn2;
  use asn2;
  CREATE TABLE IF NOT EXISTS posts (
    Title       text    DEFAULT NULL,
    PostDate    text    DEFAULT NULL,
    Content     text    DEFAULT NULL,
    Rating      int(11) DEFAULT NULL,
    Author      text    DEFAULT NULL,
    PostID      int(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (PostID)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;`;

db.query(createDatabase, (err, dbres) => {
  if (err)
    console.log(err);
});

const entry0 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('Hat Hoax', '2021-01-12', 'Norman Reedus has never worn a hat.', 1, 'Jack Flimflam')`;

const entry1 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('Attack Dolphins', '2021-01-16', 'The marine mammals are exacting their vengeance.', 4, 'Sam Neil')`;

const entry2 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('Microplastics', '2021-01-20', 'I think microplastics have done some good things for our bodies.', 1, 'Sandra Know-Nothing')`;

const entry3 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('Inland Empire', '2021-01-21', 'Lynchian fiction is a subset of Lovecraftian fiction whether we like it or not.', 5, 'Deirdre Sky')`;

const entry4 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('Dog Daze of Summer', '2021-01-21', 'I miss the days where you could just eat a muffin and like it.', 1, 'Werner Herzog')`;

const entry5 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('John Kerry', '2021-01-22', 'Great big ocean water surrounds Guam.', 8, 'Anderson Cooper')`;

const entry6 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('Time', '2021-01-22', 'The gravity of time is unmatched: we plummet ever forward.', 4, 'Alice Redgum')`;

const entry7 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('Accelerating Change', '2021-01-23', 'Verner Vinge has come unhinged and I think we overlook that.', 2, 'Roger Clemens')`;

const entry8 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('Delirium Tremens', '2021-01-24', 'The name of this Dutch beer belittles the suffering of the hungover.', 1, 'W.C. Fields')`;

const entry9 = `INSERT INTO posts (Title, PostDate, Content, Rating, Author) VALUES ('Carthago Delenda Est', '2021-01-25', 'Wait, was not Carthage right here?', 1, 'Cato the Censor')`;

const entries = [entry0, entry1, entry2, entry3, entry4, entry5, entry6, entry7, entry8, entry9];

db.query("SELECT COUNT(*) FROM posts", (err, res) => {
  if (err)
    console.log(err);
  else if (res[0]["COUNT(*)"] < 1) {
    entries.forEach(entry => {
      db.query(entry, (err, dbres) => {
        if (err) {
          console.log("Error in data entry: " + err);
        }
      })
    })
  }
})


const port = 8080;

app.use('/Scripts', express.static('Scripts'));
app.use('/Styles', express.static('Styles'));
app.use('/Images', express.static('Images'));

app.get('/', (req, res) => {
  fs.readFile('index.html', (err, pgres) => {
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
  db.query('SELECT * FROM posts;', (err, dbres, fields) => {
    if (err)
      return;
    res.send(dbres);
    res.end();
  })
})

app.post('/add-post', (req, res) => {
  let dat = req.body;
  let datArray = [dat.title, dat.date, dat.content, dat.rating, dat.username, null];
  db.query("INSERT INTO posts VALUES(?, ?, ?, ?, ?, ?)", datArray, (err, dbres) => {
    res.sendStatus(200);
  })
})

app.post('/remove-post', (req, res) => {
  db.query("DELETE FROM posts WHERE postid=?", [req.body.id], (err, dbres) => {
    res.sendStatus(200);
  })
})

app.post('/update-post', (req, res) => {
  console.log(req.body);
  let dat = req.body.data;
  console.log(dat[0]);
  var attribute_edit = ["Title", "Rating", "PostDate", "Author", "Content"];
  if (!(attribute_edit.includes(dat[0])))
    return;
  db.query("UPDATE posts SET " + dat[0] + "=? WHERE PostID=?", [dat[1], dat[2]], (err, dbres) => {
    console.log(err);
    console.log(dbres);
    res.sendStatus(200);
  })
})



app.listen(port, () => {
  console.log('Server started on port ' + port);
})