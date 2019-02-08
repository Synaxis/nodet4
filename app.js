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
      res.send('Post 1 added...');
  });
});

// Insert post 2
app.get('/addpost2', (req, res) => {
  let post = {title:'Post two', body:'This is post number 2'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Post 2 added...');
  });
});

//Select all posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Post fetched');
  });
});

app.get('/getpost/:id', (req,res) => {
  //use `` instead of '' so we can use a variable
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,result) => {
    if (err) throw err;
    console.log(result);
    res.send('Single post fetched..');
  });
});

app.listen(port, () => {
    console.log('Server online at port:', port)
});
