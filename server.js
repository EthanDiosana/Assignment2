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
    db.query("UPDATE posts SET " + dat[0] + "=? WHERE PostID=?", [dat[1], dat[2]], (err, dbres) => {
        console.log(err);
        console.log(dbres);
        res.sendStatus(200);
    })
})

db.query();

app.listen(port, () => {
    console.log('Server started on port ' + port);
})