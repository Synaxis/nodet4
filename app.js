const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 80;
//Create connection
const db = mysql.createConnection({
    host:   '172.18.0.2',
    user:   'root',
    password:   '1234',
    database:   'nodemysql'
});

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Mysql Connected..');
});

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
      if(err){
        console.log(err)
         throw err;
      }
      console.log(result);
      res.send('Posts table created..');
    });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
  let post = {title:'Post one', body:'This is post number one'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts 1 added...');
  });
});

app.listen(port, () => {
    console.log('Server online at port:', port)
});
