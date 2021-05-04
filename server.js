const express = require('express');
const app = express();
const fs = require("fs");
const mysql = require('mysql');
const db = mysql.createConnection({

})
const port = 8080;

app.get('/', (req, res) => {

    fs.readFile('/index.html', (err, pgres) => {
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

app.listen(port, () => {
    console.log('Server started on port ' + port);
})