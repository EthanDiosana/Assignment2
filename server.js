const express = require('express');
const app = express();
const fs = require("fs");
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'asn2'
});
db.connect();

/* RUN THIS SQL TO CREATE THE WORKING DATABASE:
* ----->  CREATE DATABASE asn2;  <-----
* the tables will be created for you.
*/

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
            res.writeHead(200, {'Content-Type' : 'text/html'});
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

const createDatabase = `CREATE TABLE IF NOT EXISTS posts (
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

app.listen(port, () => {
    console.log('Server started on port ' + port);
})