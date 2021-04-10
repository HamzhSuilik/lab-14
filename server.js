'use strict';
// env data
require('dotenv').config();


//---------------------- Env var -------------------------------
// Port
const PORT =process.env.PORT;
// DataBase Url
const DATABASE_URL=process.env.DATABASE_URL;
//------------------------------------------------------------

// DataBase connection
const pg=require('pg');
const client = new pg.Client(DATABASE_URL);





// connection
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const app = express();
app.use(cors());

// Expected requests

app.get('/', nothing_fun);

app.get('/create', creat_table);
app.get('/insert', insert);
app.get('/query_3', query_3);
app.get('/query_4', query_4);
app.get('/query_5', query_5);
app.get('/query_6', query_6);


app.use('*', notFoundHandler);

// Handler functions


function creat_table(city,res){
  const sqlQuery =`CREATE TABLE BOOKSHELVES (id SERIAL PRIMARY KEY, name VARCHAR(255));`;
  client.query(sqlQuery).then(
    res.status(200).send('pass')
  ).catch(error => {
    console.log(error);
    res.status(500).send('Internal server error - IN SQL DB');
  });
}



// insert

function insert(city,res){
    const sqlQuery =`INSERT INTO bookshelves(name) SELECT DISTINCT bookshelf FROM books;`;
    client.query(sqlQuery).then(
      res.status(200).send('pass')
    ).catch(error => {
      console.log(error);
      res.status(500).send('Internal server error - IN SQL DB');
    });
  }

  // Query 3
function query_3 (city,res){
    const sqlQuery =`ALTER TABLE books ADD COLUMN bookshelf_id INT;`;
    client.query(sqlQuery).then(
      res.status(200).send('pass')
    ).catch(error => {
      console.log(error);
      res.status(500).send('Internal server error - IN SQL DB');
    });
  }

    // Query 4
function query_4 (city,res){
    const sqlQuery =`UPDATE books SET bookshelf_id=shelf.id FROM (SELECT * FROM bookshelves) AS shelf WHERE books.bookshelf = shelf.name;`;
    client.query(sqlQuery).then(
      res.status(200).send('pass')
    ).catch(error => {
      console.log(error);
      res.status(500).send('Internal server error - IN SQL DB');
    });
  }

    // Query 5
function query_5 (city,res){
    const sqlQuery =`ALTER TABLE books DROP COLUMN bookshelf;`;
    client.query(sqlQuery).then(
      res.status(200).send('pass')
    ).catch(error => {
      console.log(error);
      res.status(500).send('Internal server error - IN SQL DB');
    });
  }

    // Query 6
function query_6 (city,res){
    const sqlQuery =`ALTER TABLE books ADD CONSTRAINT fk_bookshelves FOREIGN KEY (bookshelf_id) REFERENCES bookshelves(id);`;
    client.query(sqlQuery).then(
      res.status(200).send('pass')
    ).catch(error => {
      console.log(error);
      res.status(500).send('Internal server error - IN SQL DB');
    });
  }


// Nothing

function nothing_fun (req,res){
  res.status(200).send('nothing!!');
}



//error handler
function notFoundHandler(req, res) {
  res.status(404).send('you sent Invalid request!!');
}
// open Server Port
// open Database Port before

client.connect().then(()=>{
  app.listen(PORT, () =>{
    console.log("Connected to database:", client.connectionParameters.database); //show what database we connected to
    console.log('DataBase & server are ready');
  });
});

